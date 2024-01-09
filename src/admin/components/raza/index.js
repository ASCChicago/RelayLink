import React from 'react';
import axios from 'axios';
import  config from '../../../data/configData';
import ITSDataTable from './ITSDataTable';
import AddITS from './addITS'

class RazaManager extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          ITSData: [],
          errorState: false,
          MiqatData: [],
          errorITS: false,
          itsInput: '',
          miqatInput: '',
          adminInput: false,
        }
    
        this.deleteButton = this.deleteButton.bind(this);
        this.handleITSChange = this.handleITSChange.bind(this);
        this.addITS = this.addITS.bind(this);
        this.handleMiqatChange = this.handleMiqatChange.bind(this);
        this.handleAdminChange = this.handleAdminChange.bind(this);
        this.getTableDataITS = this.getTableDataITS.bind(this);
    }
    
    async componentDidMount() {
        try {
            let response = await axios.get(config.url + config.GETDATA)
            this.setState({ ITSData: response.data })

            response = await axios.get(config.url + config.GETMIQAT)
            this.setState({
                MiqatData: response.data,
                miqatInput: response.data[0].miqat_name,
            })
        } catch {
            this.setState({errorState: true});
        }
    }

   async getTableDataITS() {
        try {
            const response = await axios.get(config.url + config.GETDATA)
            this.setState({ ITSData: response.data })
        } catch {
            this.setState({errorState: true})
        }
    }

    handleITSChange(its) {
        this.setState({itsInput: its});
    }

    handleMiqatChange(event) {
        this.setState({miqatInput: event.target.value});
    }

    handleAdminChange() {
        this.setState({adminInput: !this.state.adminInput});
    }

    async deleteButton(data) {
        try {
            await axios.post(config.url + config.DELETEUSER, { 
                its_id: data.its_id,
                miqat_id: data.miqat_id
            })
            this.getTableDataITS()
        } catch {
            this.setState({errorState: true})
        }
    }

    async addITS() { 
        this.setState({
            errorITS: false
        })

        if(this.state.itsInput === '' || this.state.itsInput.length !== 8) {
            this.setState({ errorITS: true })
            return
        }

        try {
            const getMiqatIdUrl = config.url + config.GETMIQATBYNAME + '?miqat_name=' + this.state.miqatInput
            let miqatRes = await axios.get(getMiqatIdUrl)
            let MiqatId = miqatRes.data[0].miqat_id

            await axios.post(config.url + config.ADDITSNUMBER, {
                its_id: this.state.itsInput,
                admin: this.state.adminInput,
                miqat_id: MiqatId
            })

            this.setState({
                itsInput: '',
                adminInput: false
            })
            this.getTableDataITS()
        } catch {
            this.setState({errorState: true});
        }
    }

    render() {
        return (
            <div className='admin-page'>
                <AddITS
                    MiqatData={this.state.MiqatData}
                    handleITSChange={this.handleITSChange}
                    addITS={this.addITS}
                    handleMiqatChange={this.handleMiqatChange}
                    handleAdminChange={this.handleAdminChange}
                    miqatInput={this.state.miqatInput}
                    errorITS={this.state.errorITS}
                    itsInput={this.state.itsInput}
                    adminInput={this.state.adminInput}/>
                <ITSDataTable ITSData={this.state.ITSData} deleteButton={this.deleteButton} MiqatData={this.state.MiqatData}/>
            </div>
        )
    }
}

export default RazaManager