import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';

import MyMap from "./components/MyMap";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [userIP, setUserIP] = useState();
  const [userLocation, setUserLocation] = useState();

  //IP API
  useEffect(() => {
    const getIP = async () => {
      try {
        const resp = await axios.get(
          // "https://geo.ipify.org/api/v2/country?apiKey=at_UrcEiQWtH3EfNdeQsHL75arryuhcT"
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_KEY}`
        );
        setUserIP(resp.data.ip);
        setUserLocation(resp.data.location);
        //console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getIP();
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="countryInfo-container">
          {userLocation && (
            <CountryInfo userCountryCode={userLocation.country} />
          )}
        </div>
        <div className="map">
          {userLocation ? (
            <MyMap userLocation={userLocation} />
          ) : (
            <Skeleton variant="rectangular" width={400} height={700} />
          )}
        </div>

        <div className="userIP-address">
          {userIP && <div>Your IP address: {userIP}</div>}
          <div>
            {userLocation && (
              <div>
                Your location: {userLocation.city} <br /> {userLocation.region}
                {userLocation.country}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
