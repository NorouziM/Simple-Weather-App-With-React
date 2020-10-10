import React, { Component } from "react";
import Locationbox from "./LocationBox";
import WeatherBox from "./WeatherBox";
import { api } from "./constants";
import { bgGen, calcHour } from "./functions";
var isFirstTime = true; // Declare a variable to determine whether it is first time that we open the App or not
export class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: {
        sys: {
          //Default values to prevent errors
          country: " ",
        },
      },
      city: " ",
    };
  }

  render() {
    const { weather, city } = this.state; //Destructuring to reduce code lenght
    const search = (e) => {
      var key = e.which;
      if (key === 13) {
        // Check if the key is "Enter"
        fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // Fetch Dta from API
          .then((response) => response.json())
          .then((result) => {
            this.setState({ weather: result });
            isFirstTime = false; // We have set the result to state so It is not the first time anymore
          });
      }
    };
    return (
      <div
        className={
          // Background of App is base on Class names so we generae it via bgGen function
          isFirstTime || typeof weather.sys === "undefined" // Check if it is first time or Entry of ciry is wrong
            ? "app warm day" // Default background for App to prevent showing white background
            : bgGen(
                calcHour(weather.timezone), // Calculate just hour
                isFirstTime || typeof weather.sys === "undefined"
                  ? 15
                  : Math.round(weather.main.temp) // Send temperature of the city
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
                this.setState({ city: event.target.value }); // Set the city with input of search field
              }}
              onKeyPress={search}
            ></input>
          </div>
          {typeof weather.sys === "undefined" && !isFirstTime ? (
            <div className="location-box">
              <div className="location">
                <p> City Not Found! </p>
              </div>
            </div> //CHeck if the input is Valid or not and be sure not to display the error in first use
          ) : (
            " "
          )}
          {typeof weather.sys !== "undefined" && !isFirstTime ? ( // If this is the forst time or the input is invalid don't display anything below search field
            <React.Fragment>
              <Locationbox weather={weather} />
              <WeatherBox weather={weather} />
            </React.Fragment>
          ) : isFirstTime ? (
            <div className="location-box">
              <div className="location">
                <p> Try searching a City! </p>
              </div>
            </div> // Display a defult text for the first use
          ) : (
            " "
          )}
        </main>
      </div>
    );
  }
}
