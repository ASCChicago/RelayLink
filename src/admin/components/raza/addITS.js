import ErrorITSStateComponent from './errorITSState';
import ITSInput from '../../../common/ITSInput'

const AddITS = (props) => {
  const {MiqatData, handleITSChange, addITS, handleMiqatChange, handleAdminChange, miqatInput, errorITS ,itsInput, adminInput} = props;
    return (
      <div className="add-its-container">
        <div className="add-its-element" style={{flex: 1}}>
          <ITSInput onChange={handleITSChange} value={itsInput}/>
        </div>
        <div className="add-its-element" style={{flex: 1}}>
          <select value={miqatInput} onChange={handleMiqatChange} style={{width: '100%'}}>
          {MiqatData.map(( data, index ) => {
            return (
                <option value={data.miqat_name}>{data.miqat_name}</option>
              );
            })
          }
          </select>
        </div>
        <div className="add-its-element">
          <label class="pa-left pa-py-10">
          <input name="Admin" type="checkbox" checked={adminInput} onChange={handleAdminChange}/>
          Is Admin
          </label>
        </div>
        <div className="add-its-element">
          <button className="add-button" onClick={addITS}> ADD </button>
        </div>
        <div className="add-its-element">
          {errorITS && <ErrorITSStateComponent />}
        </div>
      </div>
    )
}

export default AddITS;
