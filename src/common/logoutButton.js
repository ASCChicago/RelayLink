const logoutButton = (props) => {
  const {logout} = props
    return (
      <div>
        <div className='input-group'>
          <button className="logout-button" onClick={logout}>LOGOUT</button>
        </div>
      </div>
    )
}

export default logoutButton;
