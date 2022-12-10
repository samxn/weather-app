/* Days of week from today */
function dayTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // without this 12 becomes 0

  let element = document.getElementById("dayTime");
  document.getElementById("dayTime");
  element.innerHTML = `${day}, ${hour}:${minutes} ${ampm}`;
  return element;
}
dayTime();
/*-- Days instead of number --*/
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

/*-- Days forecast --*/
function displayForcast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div>${formatDay(forecastDay.dt)}</div>
      <img
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      class="otherIcons"
      />
      <span class="max-temp">${Math.round(forecastDay.temp.max)}° </span>
      <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
      </div>
     
      `;
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForcast);
}
/* Get current location and temperature */
function showWeather(response) {
  let h1 = document.querySelector("#location");
  let mainTemp = document.querySelector("#farenTemp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let temperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");

  h1.innerHTML = `${response.data.name}`;
  mainTemp.innerHTML = `${temperature}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentWeatherBtn");
button.addEventListener("click", getCurrentPosition);

let fahrenheitTemperature;
/* --Temperature and icon change for searched city-- */
function showTemperature(response) {
  fahrenheitTemperature = Math.round(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#farenTemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let h1 = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  h1.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  tempElement.innerHTML = `${temperature}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

/* --Search City-- */
function located(event) {
  event.preventDefault();
  let entered = document.querySelector("#searchInput");
  searchCity(entered.value);
}

function searchCity(city) {
  console.log(city);
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let forms = document.querySelector("#searchField");
forms.addEventListener("submit", located);

searchCity("Atlanta");
displayForcast();
