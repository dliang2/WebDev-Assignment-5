import { Component } from 'react';
import axios from 'axios';

class SearchAPI extends Components {
  constructor(props){
    super(props);
    this.state = {
      apiData: [],
      zipcode: "",
      found: false
    }
  }

  handleInputChange = (event) => {
    this.setState({zipcode: event.target.value});
  }

  handleSearchClick = async () => {
    let zipcodeName = this.state.zipcode;
    let linkToAPI = 'http://ctp-zip-api.herokuapp.com/zip/:zipcode'+zipcodeName;
    try {
      let res = await axios.get(linkToAPI);
      this.setState({apiData: res.data, found: true});
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        this.setState({found: false});
      }
    }
  }

  makeTable = () => {
    let currData = this.state.apiData;
    let foundMatch = this.state.found;
    let table = [];

    if (!foundMatch) {

    } else {

    }
    return table;
  }

  render() {
    return {
      <div className="container">
        <div className = "search">
          <h3>Search ZipCode:</h3>
          <input type="text" value={this.state.zipcode} onChange={this.handleInputChange} placeholder="Enter Zipcode" </input>
          <button className="search-button" onClick={this.handleSearchClick}>Search</button>
        </div>
        <br/>
        <table id="data">
          <tbody>
            {this.makeTable()}
          </tbody>
        </table>
      </div>
    }
  }
}

export default SearchAPI;
