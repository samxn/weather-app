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

  let element = document.getElementById("dayTime");
  document.getElementById("dayTime");
  element.innerHTML = `${day}, ${hour}:${minutes}`;
  return element;
}
dayTime();
/* Get current location and temperature */
function showWeather(response) {
  let h1 = document.querySelector("#location");
  let mainTemp = document.querySelector("#farenTemp");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name}`;
  mainTemp.innerHTML = `${temperature}`;
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

/* --- */
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#farenTemp");

  let h1 = document.querySelector("#location");
  h1.innerHTML = response.data.name;

  tempElement.innerHTML = `${temperature}`;
}

/* --- */
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

/* Change Farenheit to Celcius */
function conversion(change) {
  change.preventDefault();
  let clicked = document.querySelector(".btn");
}

function faren(change) {
  change.preventDefault();
  let clicked = document.querySelector(".temperature");
  clicked.innerHTML = `62`;
}

let element = document.querySelector("#farenheit");
element.addEventListener("click", faren);

function celc(flip) {
  flip.preventDefault();
  let clicked = document.querySelector(".temperature");
  clicked.innerHTML = `17`;
}

let object = document.querySelector("#celcius");
object.addEventListener("click", celc);