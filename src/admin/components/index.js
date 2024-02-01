import React from 'react';
import axios from 'axios';
import  config from '../../data/configData';
import ITSDataTable from './itsDataTable';
import AddITS from './addITS'
import LogoutButton from '../../common/logoutButton'
import BackButton from './backButton'
import { sendLogoutEvent } from '../../common/audit';

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
      miqatInput: '',
      adminInput: false,
      isAdmin: false,
      forceLogout: true,
    }

    this.logout = this.logout.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.handleITSChange = this.handleITSChange.bind(this);
    this.addITS = this.addITS.bind(this);
    this.handleMiqatChange = this.handleMiqatChange.bind(this);
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.getTableDataITS = this.getTableDataITS.bind(this);
    this.redirectToRelay = this.redirectToRelay.bind(this);
    this.onBeforeUnload = this.onBeforeUnload.bind(this);
  }

  componentDidMount() {
    let logInData = window.sessionStorage.getItem("isLoggedIn")
    let adminData = window.sessionStorage.getItem("isAdmin")

    this.setState({
      isLoggedIn: (logInData && logInData === 'true') ? true : false,
      isAdmin: (adminData && adminData === 'true') ? true : false,
      isLoading: true,
      itsInput: '',
      forceLogout: true,
    })

    if (!(logInData && logInData === 'true' && adminData && adminData === 'true')) {
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

    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  onBeforeUnload() {
    if (this.state.forceLogout) {
      this.logout()
    }
    this.setState({
      forceLogout: true
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
    this.setState({
      forceLogout: false,
    })
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  handleITSChange(its) {
    this.setState({itsInput: its});
  }

  handleMiqatChange(event) {
    this.setState({miqatInput: event.target.value});
  }

  handleAdminChange() {
    this.setState({adminInput: !this.state.adminInput});
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

    sendLogoutEvent()
    window.sessionStorage.removeItem("isLoggedIn")
    window.sessionStorage.removeItem("isAdmin")

    this.setState({
      forceLogout: false,
    })
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  async addITS() {
      this.setState({
        errorITS: false
      })

      if(this.state.itsInput === '' || this.state.itsInput.length !== 8) {
        this.setState({ errorITS: true })
      } else {
        try {
          let getMiqatIdUrl = config.url + config.GETMIQATBYNAME + '?miqat_name=' + this.state.miqatInput
          let miqatRes = await axios.get(getMiqatIdUrl)
          let MiqatId = miqatRes.data[0].miqat_id

          let addUserUrl = config.url + config.ADDITSNUMBER

          await axios.post(addUserUrl,{
            its_id: this.state.itsInput,
            admin: this.state.adminInput,
            miqat_id: MiqatId
          })

          this.setState({
            itsInput: '',
            adminInput: false
          })
          this.getTableDataITS()
        } catch (error) {
          this.setState({errorState: true});
        }
      }
  }

  render() {
    return (
      <div className="admin-page-container">
        <div className='admin-page'>
          <AddITS
            MiqatData={this.state.MiqatData}
            handleITSChange={this.handleITSChange}
            addITS={this.addITS}
            handleMiqatChange={this.handleMiqatChange}
            handleAdminChange={this.handleAdminChange}
            miqatInput={this.state.miqatInput}
            errorITS={this.state.errorITS}
            itsInput={this.state.itsInput}
            adminInput={this.state.adminInput}
            />
          <ITSDataTable ITSData={this.state.ITSData} deleteButton={this.deleteButton} MiqatData={this.state.MiqatData}/>

        </div>
        <LogoutButton logout={this.logout} />
        <BackButton redirectToRelay={this.redirectToRelay} />
      </div>
    )
  }
}

export default RelayComponent;
