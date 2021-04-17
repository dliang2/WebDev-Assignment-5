import { useState, useEffect } from "react";
import axios from "axios";
import { City } from "./components/City"
import "./App.css";

const App = () => {
  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [input, setInput] =  useState("");

    useEffect(() => {
        //calling the api
    const handleSearch = async () => {
        if (zipCode === "") return;
        let linkToAPI = "https://ctp-zip-api.herokuapp.com/zip/" + zipCode;

        try {
          let response = await axios.get(linkToAPI);
          setCities(response.data);
        } catch (error) {
            //creating a child element to show the error message.
                setError(error);
                var para = document.createElement('P');
                para.id = 'P'
                para.innerHTML = 'City for ZipCode: ' + zipCode + '  was ' + error.response.data + " : "
                + error.response.status;
                return document.getElementById("results").appendChild(para);

          }
      };
      handleSearch();
    }, [zipCode]);
    //once the api returns a response we are parsing the json.
    const generateCities = () => {
      return cities.map((city) => {
        return <City key={city.RecordNumber} {...city} />;
      });
    };

    const handleChange = (e) => {
        //storing all of the given charaters before setting the Zipcode as it would otherwise
        //call the api for each charater entered.
        //Once the user presses enter we will save the input into the zipcode and then call the api
        setInput(e.target.value);
    }
    const search = () => {
        //cleaning up page if there were any error and a new input was enter so removing the child elemet.
        if( error !== '' && input !== ''){
            var lastElement =  document.getElementById('P');
            document.getElementById("results").removeChild(lastElement);
            setError("");
        }
        //resetting city so the page is reset
        if(input !== '')
        {setCities([]);}
        //setting the zipcode so we can start searching the api for results
        setZipCode(input);
        //reseting the input incase it doesnt clean up on it's own
        setInput("");
    }

    // The reson we are doing onKeyPress enter is so we can then call the api once the user is done with
    // their input, rather then constantly calling the api per each charater entered.

  return (
    <div id="content-wrapper">
      <div id="header">
        <div id="header-text">
          <h1>Zip Code Search</h1>
        </div>
      </div>
        <div id="search-box">
          <label>
            Enter Zipcode: 
          </label>
          <input className="search-box-field" placeholder="Enter a zipcode!" type="text" onChange={handleChange}
                 onKeyPress={event => {
                     if (event.key === 'Enter') {
                         search()
                     }
                 }} />
      </div>
        {generateCities()}
        <div className="result" id="results">

        </div>
    </div>
);
}

export default App;
