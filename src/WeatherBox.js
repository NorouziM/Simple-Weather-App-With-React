import React from "react";

const LocationBox = (props) => {
  const { weather } = props;
  return (
    <div className="weather-box">
      <div className="temp">
        <p>{Math.round(weather.main.temp)}°C</p>
      </div>
      <div className="weather">
        <p>
          {typeof weather.weather === "undefined"
            ? "Sunny"
            : weather.weather[0].main}
        </p>
      </div>
    </div>
  );
};
export default LocationBox;
