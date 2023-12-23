import React from 'react'
import _ from 'lodash'
import axios from 'axios'
import config from '../../data/configData';

class ITSInput extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            searchResults: [],
            textInput: ""
        }

        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleTextFocusOut = this.handleTextFocusOut.bind(this)
        this.setPotentialITS = this.setPotentialITS.bind(this)
        this.clearPotentialITS = this.clearPotentialITS.bind(this)
        this.search = this.search.bind(this)
        this.debouncedSearch = _.debounce(this.search, 500)
    }

    componentDidUpdate(prevProps) {
        if (this.props.value != prevProps.value) {
            this.setState({
                textInput: this.props.value
             });
        }
    }

    async search() {
        if (this.state.textInput.length == 0) {
            this.setState({
                searchResults: []
            })
            return
        }

        const searchURL = config.url + config.SEARCHMUMINEEN
        const response = await axios.get(searchURL, { params: { param: this.state.textInput }})
        const results = response.data;
        this.setState({
            searchResults: results
        })
    }

    handleTextChange(event) {
        const text = event.target.value
        this.setState({
            textInput: text
        })
        this.props.onChange(text)
        this.debouncedSearch()
    }

    handleTextFocusOut() {
        this.setState({
            searchResults: []
        })

        // if defined, it means the textbox lost focus because
        // the user clicked on an entry in the dropdown
        if (this.potential_its_id) {
            this.setState({
                textInput: this.potential_its_id,
            })
            this.props.onChange(this.potential_its_id)
        }
    }

    setPotentialITS(its_id) {
        this.potential_its_id = its_id
    }

    clearPotentialITS() {
        this.potential_its_id = undefined
    }

    render() {
        return (
            <div class="its-input">
                <input
                    type="text"
                    class="its-input-text"
                    name="search"
                    placeholder="Enter Name or ITS"
                    onChange={this.handleTextChange}
                    onBlur={this.handleTextFocusOut}
                    value={this.state.textInput}
                    autocomplete="off"
                />
                <ul class="its-input-dropdown" onMouseLeave={this.clearPotentialITS}>
                {
                    this.state.searchResults.map(res => {
                        const fullname = [res.First_Prefix, res.First_Name, res.Surname].join(" ")
                        return (
                            <li class="its-input-dropdown-entry"
                                onMouseEnter={() => {this.setPotentialITS(res.its_id)}}>
                                {res.its_id + ", " + fullname}
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

export default ITSInput