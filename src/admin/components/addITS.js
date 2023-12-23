import ErrorITSStateComponent from './errorITSState';
import ITSInput from './ITSInput'

const AddITS = (props) => {
  const {MiqatData, handleITSChange, addITS, handleMiqatChange, handleAdminChange, miqatInput, errorITS ,itsInput, adminInput} = props;
    return (
      <div className="add-its-container pa-p-10 ">
        <div className="pa-py-10 pa-left">
          ADD ITS DATA
        </div>

        <ITSInput onChange={handleITSChange} value={itsInput}/>

        <br />

        <select value={miqatInput} onChange={handleMiqatChange}>
          {MiqatData.map(( data, index ) => {
            return (
                <option value={data.miqat_name}>{data.miqat_name}</option>
              );
            })
          }
        </select>

        <label class="pa-left pa-py-10">
        <input name="Admin" type="checkbox" checked={adminInput} onChange={handleAdminChange}/>
        Is Admin
        </label>

        <button className="add-button pa-mt-10" onClick={addITS}> ADD </button>
        {errorITS && <ErrorITSStateComponent />}
      </div>
    )
}

export default AddITS;
