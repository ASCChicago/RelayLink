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
      forceLogout: true,
    }

    this.logout = this.logout.bind(this);
    this.setITSNumber = this.setITSNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.redirectToAdmin= this.redirectToAdmin.bind(this);
  }

  componentDidMount() {
    let logInData = window.sessionStorage.getItem("isLoggedIn")
    let adminData = window.sessionStorage.getItem("isAdmin")
    this.setState({
      isLoggedIn: (logInData && logInData === 'true') ? true : false,
      isAdmin: (adminData && adminData === 'true') ? true : false,
      forceLogout: true,
    })

    console.log(this.state.forceLogout)
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  onBeforeUnload(e) {
      if (this.state.forceLogout) {
        this.logout();
      }
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
    this.setState({
      forceLogout: false,
    })
    setTimeout(() => {
      window.location.href = '/admin'
    }, 1000);
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
    window.sessionStorage.setItem("userId", user.id)
    window.sessionStorage.setItem("miqatId", user.miqat_id)
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
