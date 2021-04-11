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
    let linkToAPI = 'http://ctp-zip-api.herokuapp.com/zip/'+zipcodeName;
    try {
      let response = await axios.get(linkToAPI);
      this.setState({apiData: response.data, found: true});
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); //not found
        console.log(error.response.status); //404
        this.setState({found: false});
      }
    }
  }

  makeTable = () => {
    let currData = this.state.apiData;
    let foundMatch = this.state.found;
    let table = [];

    if (!foundMatch) {
      table.push(<tr key={-1}><td>No Results</td></tr>);
      return table;
    } else {
      let LocationText = currData.LocationText;
      let cState = currData.State;
      let cLat = currData.Lat;
      let cLong = currData.Long;
      let cEstimatedPopulation = currData.EstimatedPopulation;
      let cTotalWages = currData.TotalWages;
      table.push(
        <tr key={currData.id}>
          <td>{LocationText}</td>
          <td>State: {cState}</td>
          <td>Location: {cLat}, {cLong}</td>
          <td>Population: {cEstimatedPopulation}</td>
          <td>Wages: {cTotalWages}</td>
        </tr>
      );
      return table;
    }
  }

  render() {
    return {
      <div className="container">
        <div className = "search">
          <h3>Search ZipCode:</h3>
          <input type="text" value={this.state.zipcode} onChange={this.handleInputChange} placeholder="Enter Zipcode"/>
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
