import { useState, useEffect } from "react";
import axios from "axios";
import { City } from "./components/City"
import "./App.css";

const App = () => {
  const [zipCode, setZipCode] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
        if (zipCode === "") return;
        let linkToAPI = "https://ctp-zip-api.herokuapp.com/zip/" + zipCode;

        try {
          let response = await axios.get(linkToAPI);
          setCities(response.data);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
          }
        }
      };
      handleSearch();
    }, [zipCode]);

    const generateCities = () => {
      return cities.map((city) => {
        return <City key={city.RecordNumber} {...city} />;
      });
    };

    const handleChange = (e) => {
      // TODO: if input is not valid, print no results
      //       reset the output if the input is changed after a successful search
      setZipCode(e.target.value)
    }

  return (
    <div className="App">
      <header>
        <h2>Zip Code Search</h2>
      </header>

        <label>
          Enter a Zip Code
        </label>
        <input type="text" onChange={handleChange} />

      {generateCities()}
    </div>
);
}

export default App;
