import React from 'react';
import axios from 'axios';
import  config from '../../data/configData';
import ITSDataTable from './itsDataTable';
import AddITS from './addITS'
import LogoutButton from '../../common/logoutButton'
import BackButton from './backButton'

class RelayComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      ITSData: [],
      errorState: false,
      MiqatData: [],
      isLoading: false,
      errorITS: false,
      itsInput: '',
      miqatInput: ''
    }

    this.logout = this.logout.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.handleITSChange = this.handleITSChange.bind(this);
    this.addITS = this.addITS.bind(this);
    this.handleMiqatChange = this.handleMiqatChange.bind(this);
    this.getTableDataITS = this.getTableDataITS.bind(this);
    this.redirectToRelay = this.redirectToRelay.bind(this);
  }

  componentDidMount() {
    let logInData = window.sessionStorage.getItem("isLoggedIn")

    this.setState({
      isLoggedIn: (logInData && logInData === 'true') ? true : false,
      isLoading: true,
      itsInput: '',
    })

    if (this.state.isLoggedIn) {
      window.location.href = '/';
    }

    let getTableData = config.url + config.GETDATA
    axios.get(getTableData).then(response => {
      this.setState({
        ITSData: response.data,
      })
    }).catch((error, data) => {
      this.setState({errorState: true});
    })

    let getMiqatData = config.url + config.GETMIQAT
    axios.get(getMiqatData).then(response => {
      this.setState({
        isLoading: false,
        MiqatData: response.data,
        miqatInput: response.data[0].miqat_name,
      })
    }).catch((error, data) => {
      this.setState({errorState: true});
    })
  }

  getTableDataITS() {
    let getTableData = config.url + config.GETDATA
    axios.get(getTableData).then(response => {
      this.setState({
        ITSData: response.data,
      })
    }).catch((error, data) => {
      this.setState({errorState: true});
    })
  }

  redirectToRelay() {
    window.location.href = '/'
  }

  handleITSChange(event) {
    this.setState({itsInput: event.target.value});
  }

  handleMiqatChange(event) {
    this.setState({miqatInput: event.target.value});
  }


  deleteButton(data) {
    let deleteDataUrl = config.url + config.DELETEUSER
    axios.post(deleteDataUrl, { its_id: data.its_id, miqat_id: data.miqat_id }).then(response => {
      this.getTableDataITS()
    }).catch((error, data) => {
      this.setState({errorState: true});
    })
  }

  logout() {
    this.setState({
      isLoggedIn:false,
      ITSNumber: '',
      isLoading: false,
      errorState: false,
    })
    window.sessionStorage.removeItem("isLoggedIn")
    window.sessionStorage.removeItem("isAdmin")
    window.location.href = '/';

  }

  addITS() {
      let MiqatId = 0;

      this.setState({
        errorITS: false
      })

      if(this.state.itsInput === '' || this.state.itsInput.length !== 8) {
        this.setState({
          errorITS: true
        })
      } else {
        let getMiqatIdUrl = config.url + config.GETMIQATBYNAME + '?miqat_name=' + this.state.miqatInput;
        axios.get(getMiqatIdUrl).then(response => {
          MiqatId = response.data[0].miqat_id;

          let addUserUrl = config.url + config.ADDITSNUMBER
          axios.post(addUserUrl, { its_id: this.state.itsInput, admin: 0, miqat_id: MiqatId }).then(response => {

            this.setState({
              itsInput: ''
            })
            this.getTableDataITS()
          }).catch((error, data) => {
            this.setState({errorState: true});
          })

        }).catch((error, data) => {
          this.setState({errorState: true});
        })


      }
  }

  render() {
    let adminData = window.sessionStorage.getItem("isAdmin")

    if (adminData && adminData === 'false' ) {
        window.location.href = '/';
    } else {
      return (
        <div>
          <div className='admin-page'>
            <AddITS
              MiqatData={this.state.MiqatData}
              handleITSChange={this.handleITSChange}
              addITS={this.addITS}
              handleMiqatChange={this.handleMiqatChange}
              miqatInput={this.state.miqatInput}
              errorITS={this.state.errorITS}
              itsInput={this.state.itsInput}
              />
            <ITSDataTable ITSData={this.state.ITSData} deleteButton={this.deleteButton} />

          </div>
          <LogoutButton logout={this.logout} />
          <BackButton redirectToRelay={this.redirectToRelay} />
        </div>
      )
    }
  }
}

export default RelayComponent;
