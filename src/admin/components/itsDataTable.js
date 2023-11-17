const ITSDataTable = (props) => {
  const {ITSData, deleteButton} = props;
    return (
      <div>
        <div className="pa-p-10 pa-left">
          RAZA for ITS
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th className="pa-p-10">ID</th>
              <th className="pa-p-10">ITS Number</th>
              <th className="pa-p-10">DELETE ITS</th>
            </tr>
          </thead>
          <tbody>
            {ITSData.map(( data, index ) => {
            return (
              <tr key={index + 1}>
                <td className="pa-p-10">{index + 1}</td>
                <td className="pa-p-10">{data.its_id}</td>
                <td className="pa-p-10">
                   <button className="delete-button" onClick={() => deleteButton(data.its_id)}> DELETE </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    )
}

export default ITSDataTable;