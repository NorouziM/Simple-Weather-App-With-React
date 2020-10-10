import React, { Component } from "react";
import Locationbox from "./LocationBox";
import WeatherBox from "./WeatherBox";
import { api } from "./constants";
import { bgGen, calcHour } from "./functions";
var isFirstTime = true;
export class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: {
        sys: {
          country: " ",
        },
      },
      city: " ",
    };
  }

  render() {
    const { weather, city } = this.state;
    const search = (e) => {
      var key = e.which;
      if (key === 13) {
        fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            isFirstTime = false;
            this.setState({ weather: result });
          });
      }
    };
    return (
      <div
        className={
          isFirstTime || typeof weather.sys === "undefined"
            ? "app warm day"
            : bgGen(
                calcHour(weather.timezone),
                isFirstTime || typeof weather.sys === "undefined"
                  ? 15
                  : Math.round(weather.main.temp)
              )
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(event) => {
                this.setState({ city: event.target.value });
              }}
              onKeyPress={search}
            ></input>
          </div>
          {typeof weather.sys === "undefined" && !isFirstTime ? (
            <div className="location-box">
              <div className="location">
                <p> City Not Found! </p>
              </div>
            </div>
          ) : (
            " "
          )}
          {typeof weather.sys !== "undefined" && !isFirstTime ? (
            <React.Fragment>
              <Locationbox weather={weather} />
              <WeatherBox weather={weather} />
            </React.Fragment>
          ) : isFirstTime ? (
            <div className="location-box">
              <div className="location">
                <p> Try searching a City! </p>
              </div>
            </div>
          ) : (
            " "
          )}
        </main>
      </div>
    );
  }
}
