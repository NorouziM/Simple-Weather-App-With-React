import { days, months } from "./constants";

export const dateFormater = (currentDate) => {
  switch (currentDate) {
    case 1:
      return `${currentDate}st`;
    case 2:
      return `${currentDate}nd`;
    case 3:
      return `${currentDate}rd`;
    default:
      return `${currentDate}th`;
  }
};
export const timeFormater = (min) => {
  return min > 10 ? min : "0" + min;
};

export const myDateBuilder = (date) => {
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  return `${currentDay} , ${dateFormater(currentDate)} ${currentMonth}`;
};
export const calcTime = (offset) => {
  offset = offset / 3600;
  var date = new Date();
  var utc = date.getTime() + date.getTimezoneOffset() * 60000;
  var newDate = new Date(utc + 3600000 * offset);
  return newDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
export const calcHour = (offset) => {
  offset = offset / 3600;
  var date = new Date();
  var utc = date.getTime() + date.getTimezoneOffset() * 60000;
  var newDate = new Date(utc + 3600000 * offset);
  return newDate.getHours();
};
export const bgGen = (timeOfDay, temperature) => {
  console.log(timeOfDay, temperature);
  if (temperature > 16 && (timeOfDay > 19 || timeOfDay < 6))
    return "app warm night";
  if (temperature <= 16 && (timeOfDay < 19 || timeOfDay > 6))
    return "app cold day";
  if (temperature <= 16 && (timeOfDay > 19 || timeOfDay < 6))
    return "app cold day";
  return "app warm day";
};
