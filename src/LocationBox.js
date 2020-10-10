import React from "react";
import { myDateBuilder, calcTime } from "./functions";

const LocationBox = (props) => {
  const { weather } = props;
  return (
    <div className="location-box">
      <div className="location">
        <p>
          {weather.name}, {weather.sys.country}
        </p>
      </div>
      <div className="date">{myDateBuilder(new Date())}</div>
      <div className="time">
        <p>{calcTime(weather.timezone)}</p>
      </div>
    </div>
  );
};
export default LocationBox;
