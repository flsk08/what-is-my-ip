import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

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
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_KEY}`
        );
        setUserIP(resp.data.ip);
        setUserLocation(resp.data.location);
        console.log(resp.data)
      } catch (err) {
        console.log(err);
      }
    };
    getIP();
  }, []);

  return (
    <div className="App">
      <h1>IP FINDER</h1>
      {userLocation ? (
        <div className="wrapper">
          <div className="info">
            <div className="countryInfo-container">
              {userLocation && (
                <CountryInfo userCountryCode={userLocation.country} />
              )}
            </div>
            <div className="userIP-address">
              {userIP && (
                <div>
                  <b>Your IP address: <br/> {userIP}</b>
                </div>
              )}
              <br/>
              <div>
                {userLocation && (
                  <div>
                    <b>
                       Your current location: <br/> {userLocation.city} &nbsp;
                      {userLocation.region}
                    </b>
                    {/* {userLocation.country} */}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="map">
            {userLocation && <MyMap userLocation={userLocation} />}
          </div>
        </div>
      ) : (
        <Skeleton variant="rectangular" width={800} height={563} />
      )}
    </div>
  );
}

export default App;
