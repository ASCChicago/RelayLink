const relayLink = (props) => {
  const {logout ,isAdmin ,redirectToAdmin} = props
    return (
      <div class="relay-link-container">
        <iframe
          title="relayLink"
          src="https://player.castr.com/live_43c64a10a70f11ed8dff5b542a72e2fe"
          class="relay-link"
          style={{aspectRatio: 16/9}}
          frameBorder="0"
          scrolling="no"
          allow="autoplay"
          allowFullScreen
          webkitallowfullscreen="webkitallowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          oallowfullscreen="oallowfullscreen"
          msallowfullscreen="msallowfullscreen"></iframe>

        <div className='input-group'>
          <button className="logout-button" onClick={logout}>LOGOUT</button>
        </div>
        { isAdmin &&
          <div className='input-group'>
            <button className="logout-button" onClick={redirectToAdmin}>Redirect To Admin Page</button>
          </div>
        }
      </div>
    )
}

export default relayLink;
