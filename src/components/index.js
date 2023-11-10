import React from 'react';
import RelayLinkComponent from './relayLink';
import LoginPage from './loginPage';
import axios from 'axios';
import  config from '../data/configData';

class RelayComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      ITSNumber: '',
      isLoading: false,
      errorState: false,
    }

    this.logout = this.logout.bind(this);
    this.setITSNumber = this.setITSNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let logInData = window.sessionStorage.getItem("isLoggedIn")
    this.setState({
      isLoggedIn: (logInData && logInData === 'true') ? true : false,
    })
  }

  logout() {
    this.setState({
      isLoggedIn:false,
      ITSNumber: '',
      isLoading: false,
      errorState: false,
    })
    window.sessionStorage.setItem("isLoggedIn", false)
  }

  setITSNumber(value) {
    this.setState({
      ITSNumber:value,
    })
  }


  handleSubmit() {
      this.setState({
        isLoading: true,
      })

    // Handling with local json file
      // if(ITSDATA.ITSNUMBERS.includes(Number(this.state.ITSNumber))) {
      //   this.setState({
      //     errorState: false,
      //     isLoggedIn: true,
      //     isLoading: false,
      //   });
      //   window.sessionStorage.setItem("isLoggedIn", true)
      // } else {
      //   this.setState({
      //     errorState: true,
      //     isLoggedIn: false,
      //     isLoading: false,
      //   });
      //   window.sessionStorage.setItem("isLoggedIn", false)
      // }

      //  Handling with ASC API
      let test = config.url + config.GETDATA
      axios.get(test).then(response => {
        this.setState({
          isLoading: false,
        })

        let ValidITSNumber = response.data.includes(this.state.ITSNumber)

        if (!ValidITSNumber) {
          this.setState({
            errorState: true,
            isLoggedIn: false,
          });
          window.sessionStorage.setItem("isLoggedIn", false)
        } else {
          this.setState({
            errorState: false,
            isLoggedIn: true,
          });

          window.sessionStorage.setItem("isLoggedIn", true)
        }
      }).catch((error, data) => {
        this.setState({errorState: true});
      })
  }


  render() {
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <RelayLinkComponent logout={this.logout}/> :
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
