import React from 'react';
import RelayLinkComponent from './relayLink';
import LoginPage from './loginPage';
import axios from 'axios';
import  config from '../../data/configData';
import { sendLoginEvent, sendLogoutEvent } from '../../common/audit';

class RelayComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      ITSNumber: '',
      isLoading: false,
      errorState: false,
      isAdmin: false,
    }

    this.logout = this.logout.bind(this);
    this.setITSNumber = this.setITSNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let logInData = window.sessionStorage.getItem("isLoggedIn")
    let adminData = window.sessionStorage.getItem("isAdmin")
    this.setState({
      isLoggedIn: (logInData && logInData === 'true') ? true : false,
      isAdmin: (adminData && adminData === 'true') ? true : false,
    })
  }

  logout() {
    this.setState({
      isLoggedIn: false,
      ITSNumber: '',
      isLoading: false,
      errorState: false,
      isAdmin: false,
    })
    window.sessionStorage.removeItem("isLoggedIn")
    window.sessionStorage.removeItem("isAdmin")
    sendLogoutEvent()
  }

  setITSNumber(value) {
    this.setState({
      ITSNumber:value,
    })
  }

  redirectToAdmin() {
    window.location.href = '/admin'
  }


  handleSubmit() {
      this.setState({
        isLoading: true,
      })

      //  Handling with ASC API
      let getUserAPI = config.url + config.GETDATA
      axios.get(getUserAPI).then(response => {
        this.setState({
          isLoading: false,
        })

        console.log(response.data)

        let user = response.data
          .filter(user => user.its_id === this.state.ITSNumber)
          .pop()

        if (!user) {
          this.handleLoginFail();
        } else {
          this.handleLoginSuccess(user);
        }
      }).catch(() => {
        this.setState({
          isLoading: false,
        })
        this.handleLoginFail();
      })
  }

  handleLoginSuccess(user) {
    this.setState({
      errorState: false,
      isLoggedIn: true,
      isAdmin: user.is_admin,
    });
    window.sessionStorage.setItem("isLoggedIn", true)
    window.sessionStorage.setItem("isAdmin", user.is_admin)
    sendLoginEvent()
  }

  handleLoginFail() {
    this.setState({
      errorState: true,
      isLoggedIn: false,
    });
    window.sessionStorage.setItem("isLoggedIn", false)
  }


  render() {
    return (
      <div className="user-container">
        {
          this.state.isLoggedIn ?
          <RelayLinkComponent logout={this.logout} isAdmin={this.state.isAdmin} redirectToAdmin={this.redirectToAdmin} /> :
           <LoginPage
            handleSubmit={this.handleSubmit}
            setITSNumber={this.setITSNumber}
            ITSNumber={this.state.ITSNumber}
            isLoading={this.state.isLoading}
            errorState={this.state.errorState}
            />
        }
      </div>
    )
  }
}

export default RelayComponent;
