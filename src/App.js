import { useState, useEffect } from "react";
import axios from "axios";
import { City } from "./components/City"
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations"
import { bounceIn } from "react-animations"
import "./App.css";

const fadeAnimation = keyframes`${fadeIn}`;
const FadeIn = styled.div`
  animation: 2s $(fadeAnimation);
`;

const bounceAnimation = keyframes`${bounceIn}`;
const BounceIn = styled.div`
  animation: 1s $(bounceAnimation);
`;

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
    <div>
      <div className="nav bg-black text-white text-center">
        <div class="container-fluid position-relative my-4">
          <BounceIn><p className="h2">Zip Code Search</p></BounceIn>
        </div>
      </div>
        <div className="container mt-4">
          <FadeIn><label>
            Enter Zipcode
          </label>
          <input type="text" onChange={handleChange} /></FadeIn>
      </div>
      {generateCities()}
    </div>
);
}

export default App;
