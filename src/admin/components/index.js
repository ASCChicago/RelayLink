import React from 'react';
import RazaManager from './raza';
import ActiveSessionViewer from './active-sessions'
import LogoutButton from '../../common/logoutButton'
import BackButton from './backButton'
import TabManager from './TabManager'

class RelayComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      tabIndex: 0
    }

    this.logout = this.logout.bind(this);
    this.redirectToRelay = this.redirectToRelay.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    let logInData = window.sessionStorage.getItem("isLoggedIn")
    this.setState({
      isLoggedIn: logInData === 'true'
    })
  }

  redirectToRelay() {
    window.location.href = '/'
  }

  onTabChange(tabIndex) {
    this.setState({ tabIndex: tabIndex })
  }

  logout() {
    this.setState({
      isLoggedIn: false
    })
    window.sessionStorage.removeItem("isLoggedIn")
    window.sessionStorage.removeItem("isAdmin")
    window.location.href = '/';
  }

  render() {
    let adminData = window.sessionStorage.getItem("isAdmin")
    if (adminData && adminData === 'false' ) {
        window.location.href = '/';
    } else {
      return (
        <div class="admin-page-container">
          <TabManager
            tabs={["Raza Management", "Active Sessions"]}
            tabIndex={this.state.tabIndex}
            onTabChange={this.onTabChange}/>
          { [<RazaManager/>, <ActiveSessionViewer/>][this.state.tabIndex] }
          <LogoutButton logout={this.logout} />
          <BackButton redirectToRelay={this.redirectToRelay} />
        </div>
      )
    }
  }
}

export default RelayComponent;
