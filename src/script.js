
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let city = document.querySelector("#city-name");
  city.innerHTML = searchInput.value;
}
let citySearchForm = document.querySelector("#city-search");
citySearchForm.addEventListener("submit", handleSearchSubmit);
