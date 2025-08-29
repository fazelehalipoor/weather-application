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

let citySearchForm = document.querySelector("#city-search");
citySearchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Tehran");
