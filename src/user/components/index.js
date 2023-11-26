import React from 'react';
import RelayLinkComponent from './relayLink';
import LoginPage from './loginPage';
import axios from 'axios';
import  config from '../../data/configData';

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
      isLoggedIn:false,
      ITSNumber: '',
      isLoading: false,
      errorState: false,
      isAdmin: false,
    })
    window.sessionStorage.removeItem("isLoggedIn")
    window.sessionStorage.removeItem("isAdmin")
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
      let getUserApi = config.url + config.GETDATA

      axios.get(getUserApi).then(response => {
        this.setState({
          isLoading: false,
        })

        let ValidITSNumber = false;
        let isAdminData = false;
        response.data.forEach( data => {
          if (data.its_id === this.state.ITSNumber) {
            ValidITSNumber = true;
            isAdminData = data.is_admin;
            this.setState({
              errorState: false,
              isLoggedIn: true,
              isAdmin: data.is_admin,
            });
          }
        })

        if (!ValidITSNumber) {
          this.setState({
            errorState: true,
            isLoggedIn: false,
          });
          window.sessionStorage.setItem("isLoggedIn", false)
        } else {
          window.sessionStorage.setItem("isLoggedIn", true)
          window.sessionStorage.setItem("isAdmin", isAdminData)
        }
      }).catch((error, data) => {
        this.setState({
          errorState: true,
          isLoading: false,
        });
      })
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
