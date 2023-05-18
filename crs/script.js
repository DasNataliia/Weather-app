let apiWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=7401c74fb46516853ce6e1c8d00fac73&units=metric";

let apiKey = "7401c74fb46516853ce6e1c8d00fac73";


function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let h3 = document.querySelector("#city");
  let temp = document.querySelector("#temperature");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    h3.innerHTML = response.data.name;
    temp.innerHTML = `${Math.round(response.data.main.temp)} ℃`;

    displayTemperature(response); 
  });
}

function displayTemperature(response) {
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
 let iconElement = document.querySelector(".weather-temperature img");


  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
axios.get(apiWeatherUrl).then(function (response) {
  displayTemperature(response);
});


let searchSity = document.querySelector("#search-form");
searchSity.addEventListener("submit", search);

// date
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentlyDate = document.querySelector("#date");
currentlyDate.innerHTML = `${days[day]} ${hours}:${minutes}`;

function showWeather(response) {
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.name;
  let temp = document.querySelector("h1");
  temp.innerHTML = `${Math.round(response.data.main.temp)} ℃`;
}

//current
function currentlyPosition(position) {
  let apiKey = "7401c74fb46516853ce6e1c8d00fac73";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentlyPosition);
}

let buttonLink = document.querySelector("#current");
buttonLink.addEventListener("click", currentLocation);
