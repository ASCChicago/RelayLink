import ErrorITSStateComponent from './errorITSState';

const AddITS = (props) => {
  const {MiqatData, handleITSChange, addITS, handleMiqatChange, miqatInput, errorITS ,itsInput} = props;
    return (
      <div className="add-its-container pa-p-10 ">
        <div className="pa-p-10 pa-left">
          Add for ITS
        </div>
        <input type="text" id="itsNumber" name="fname" placeholder="Enter ITS Number" onChange={handleITSChange} value={itsInput}/><br/>

        <select value={miqatInput} onChange={handleMiqatChange}>
          {MiqatData.map(( data, index ) => {
            return (
                <option value={data.miqat_name}>{data.miqat_name}</option>
              );
            })
          }
        </select>

        <button className="add-button pa-mt-10" onClick={addITS}> ADD </button>
        {errorITS && <ErrorITSStateComponent />}
      </div>
    )
}

export default AddITS;
