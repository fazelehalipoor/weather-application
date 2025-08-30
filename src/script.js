function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#description");
  let date = new Date();
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  description.innerHTML = `${response.data.condition.description}`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  updateBackground(response.data.condition.description.toLowerCase());
  getForecast(response.data.city);
}
function formatDate(date) {
  let dateOfMonth = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    " May",
    " June",
    "July",
    " August",
    " September",
    " October",
    " November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${day} ${dateOfMonth} ${month},`;
}
function searchCity(city) {
  let apiKey = "21b4c3ea35c50f8b3156odtae63b894e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");

  searchCity(searchInput.value);
}

function updateBackground(condition) {
  let app = document.querySelector(".weather-app");

  if (condition.includes("rain")) {
    app.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/172/987/original/rainy.jpg?1756511978')";
  } else if (condition.includes("clear")) {
    app.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/172/985/original/sunny.jpg?1756511350')";
  } else if (condition.includes("cloud", "thunder")) {
    app.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/172/989/original/cloud.jpg?1756512047')";
  } else if (condition.includes("snow")) {
    app.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/172/986/original/snowy.jpg?1756511898')";
  } else {
    app.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/172/988/original/default.jpg?1756512000')";
  }

  app.style.backgroundSize = "cover";
  app.style.backgroundPosition = "center";
  app.style.backgroundRepeat = "no-repeat";
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let citySearchForm = document.querySelector("#city-search");
citySearchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Tehran");
