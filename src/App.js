import axios from "axios";
import React, { useState, useEffect } from "react";
import Rain from "./assets/rain.png";
import Cloud from "./assets/cloud.png";
import Sun from "./assets/sun.png";

function App() {
  const [cityName, setCityName] = useState("Jerusalem");
  const [units, setUnits] = useState("metric");
  const [errMSG, setErrMSG] = useState("");
  const [data, setData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState();

  const searchCity = (event) => {
    if (event.key === "Enter") {
      const urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=f007d00baaa36247a2d81d1b038eb9b0`;
      axios
        .get(urlKey)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
            setErrMSG("");
          }
        })
        .catch((error) => {
          setErrMSG(
            "either you haven't chosen a city or the one you have chosen doesn't exist, choose another one;)"
          );
        });
    }
  };

  const handleUnitsChange = (unitName) => {
    setUnits(unitName);
    setUnits(unitName);
  };

  useEffect(() => {
    searchCity({ key: "Enter" });
  }, [units]);

  useEffect(() => {
    if (data.weather && data?.weather[0]?.main) {
      if (data.weather[0].main === "Clear") setWeatherIcon(Sun);
      else if (data.weather[0]?.main === "Rain") setWeatherIcon(Rain);
      else setWeatherIcon(Cloud);
    }
  }, [data]);

  return (
    <div className="app">
      <div className="searchCity">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          onKeyPress={searchCity}
          placeholder="enter a city to search"
        ></input>
      </div>
      {errMSG.length > 0 ? (
        <div className="errMSG">
          <h2>{errMSG}</h2>
        </div>
      ) : (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>

              {data.name && (
                <div className="button-container">
                  <button
                    className={units === "metric" ? "clicked-btn" : ""}
                    onClick={() => handleUnitsChange("metric")}
                  >
                    Metric
                  </button>
                  <button
                    className={units === "imperial" ? "clicked-btn" : ""}
                    onClick={() => handleUnitsChange("imperial")}
                  >
                    Imperial
                  </button>
                </div>
              )}
              <div className="temp">
                {units === "metric"
                  ? data.main && <h1>{data.main.temp.toFixed()}°C</h1>
                  : data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
              </div>

              <div className="description">
                {data?.weather && (
                  <>
                    <p>{data.weather[0].main}</p>
                    <img src={weatherIcon} />
                  </>
                )}
              </div>
            </div>
          </div>
          {data.name && (
            <div className="bottom">
              <div className="feels-like">
                {units === "metric"
                  ? data.main && <p>{data.main.feels_like.toFixed()}°C</p>
                  : data.main && <p>{data.main.feels_like.toFixed()}°F</p>}
                <p>feels more like</p>
              </div>
              <div className="humidity">
                {data.main && <p>{data.main.humidity}%</p>}
                <p>humidity</p>
              </div>
              <div className="wind">
                {units === "metric"
                  ? data.wind && <p>{data.wind.speed} M/S</p>
                  : data.wind && <p>{data.wind.speed} MPH</p>}
                <p>speed of wind</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
