const logoutButton = (props) => {
  const {redirectToRelay} = props
    return (
      <div>
        <div className='input-group'>
          <button className="back-button" onClick={redirectToRelay}>Back</button>
        </div>
      </div>
    )
}

export default logoutButton;
