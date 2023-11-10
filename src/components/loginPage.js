import ErrorStateComponent from './errorState';

const LoginPage = (props) => {
  const {errorState, isLoading, handleSubmit, setITSNumber, ITSNumber} = props;
    return (
      <div className="login-section">
        <div>
          <img className='logo-image' src="https://www.its52.com/imgs/1443/ITS_Logo_Golden.png?v1" alt="Anjumane Saifee Chicago" />
          <div className="heading-title">
            <span>ANJUMANE SAIFEE CHICAGO RELAY</span>
          </div>
          <img className="motif-login" src="https://www.its52.com/imgs/1443/Motif_Login.png?v1" alt="" />
        </div>


        <div className="input-group">
          <span className="lbl-text"> ITS ID</span>
          <div>
            <input
              className="input-control"
              type="number"
              placeholder="Enter ITS ID"
              maxLength={8}
              pattern='[0-9]*'
              value={ITSNumber}
              onChange = {(e) => setITSNumber(e.target.value)}/>
          </div>
        </div>

        <div className="input-group">
          <button className="login-button" disabled={isLoading} onClick={handleSubmit}> Login </button>
        </div>

        {errorState && <ErrorStateComponent />}
      </div>
    )
}

export default LoginPage;
