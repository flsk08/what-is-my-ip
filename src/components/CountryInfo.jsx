import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CountryInfo({ userCountryCode }) {
  const [countryInfo, setCountryInfo] = useState();

  useEffect(() => {
    const getCountry = async () => {
      try {
        const resp = await axios.get(
          `https://restcountries.com/v3.1/alpha/${userCountryCode.toLowerCase()}`
        );
        setCountryInfo(resp.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getCountry();
  }, [userCountryCode]);

  return (
    <div className="countryInfo">
      {countryInfo && (
        <>
          <h2>{countryInfo.region}</h2>
          <p>{countryInfo.altSpellings[1]}</p>
          <img src={countryInfo.flags.png} alt={countryInfo.altSpellings[1]} />
        </>
      )}
    </div>
  );
}
