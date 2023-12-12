import React from 'react';

class RelayLink extends React.Component {
  constructor(props) {
    super(props)

    this.logout = props.logout;
    this.isAdmin = props.isAdmin;
    this.redirectToAdmin = props.redirectToAdmin;

    this.resizeRelayLink = () => {
        const streamContainer = document.getElementsByClassName('relay-link-stream-container')[0];
        const stream = document.getElementById('relay-link-stream')
        const navigationContainer = document.getElementsByClassName('relay-link-navigation')[0];
  
        const containerWidth = streamContainer.clientWidth;
        // TODO: This is bad because we have to change this line whenever we add more elements to this page.
        // Couldn't use streamContainer.clientHeight because the navigation would get hidden when shrinking the window height
        // Need to figure out why this was happening.
        const containerHeight = document.body.clientHeight - navigationContainer.clientHeight;
  
        const aspect_ratio = 16/9
        let streamHeight = containerHeight;
        let streamWidth = streamHeight * aspect_ratio;
        if (streamWidth > containerWidth) {
          streamWidth = containerWidth;
          streamHeight = streamWidth * 1/aspect_ratio;
        }
  
        stream.style.width = Math.round(streamWidth) + "px";
        stream.style.height = Math.round(streamHeight) + "px";
    }
  }

  componentDidMount() {
    this.resizeRelayLink();
    window.addEventListener("resize", this.resizeRelayLink, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeRelayLink);
  }

  render() {
    return (
      <div className="relay-link-container">

        <div className="relay-link-stream-container">
            <iframe
              title="relayLinkStream"
              src="https://player.castr.com/live_43c64a10a70f11ed8dff5b542a72e2fe"
              id="relay-link-stream"
              frameBorder="0"
              scrolling="no"
              allow="autoplay"
              allowFullScreen
              webkitallowfullscreen="webkitallowfullscreen"
              mozallowfullscreen="mozallowfullscreen"
              oallowfullscreen="oallowfullscreen"
              msallowfullscreen="msallowfullscreen">
            </iframe>
        </div>

        <div className="relay-link-navigation">
          <div className='input-group'>
            <button className="logout-button" onClick={this.logout}>LOGOUT</button>
          </div>
          { this.isAdmin &&
            <div className='input-group'>
              <button className="logout-button" onClick={this.redirectToAdmin}>Redirect To Admin Page</button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default RelayLink;
