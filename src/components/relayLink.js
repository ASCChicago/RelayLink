const relayLink = (props) => {
  const {logout} = props
    return (
      <div>
        <iframe
          title="relayLink"
          src="https://player.castr.com/live_43c64a10a70f11ed8dff5b542a72e2fe"
          width="100%"
          style={{aspectRatio: 16/9, minHeight: '340px'}}
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
      </div>
    )
}

export default relayLink;
