let info = new Date();
let day = info.getDay();
let hour = info.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = info.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
];
let all_time = `${days[day]} ${hour}:${minute}`;
document.querySelector("#now").innerHTML = all_time;
function Forecast(response) {
  let fdays = response.data.daily;
  let forecastElement = "";
  forecastElement += `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  fdays.forEach(function (day, index) {
    console.log(day);
    if (index < 7 && index > 0) {
      let date = new Date(day.dt * 1000);
      let newDay = date.getDay();
      forecastElement += `<div class="col-2 inCenter">
                          <p class="forecastDay">${days[newDay]}</p>
                          <img class="forecastImg" src=http://openweathermap.org/img/wn/${
                            day.weather[0].icon
                          }@2x.png >
                          <p class="temp">${Math.round(
                            day.temp.max
                          )}°   ${Math.round(day.temp.min)}°</p>
                      </div>`;
    }
  });
  forecastElement += `</div>`;
  document.querySelector("#forecast").innerHTML = forecastElement;
}

function getByCoords(data) {
  let lon = data.lon;
  let lat = data.lat;
  let apiKey = "2610fc391e59a1d4c413f050d38f672d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(Forecast);
}
function showWeather(response) {
  //data
  getByCoords(response.data.coord);
  //city
  document.querySelector(
    "#city_weather"
  ).innerHTML = `${response.data.name} , ${response.data.sys.country}`;

  //gradus
  document.querySelector("#gradus").innerHTML = Math.round(
    response.data.main.temp
  );

  //decription
  document.querySelector("#whatIsTheWeather").innerHTML =
    response.data.weather[0].main;

  //humidity
  document.querySelector(
    "#humidity"
  ).innerHTML = ` ${response.data.main.humidity}%`;

  //wind
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;

  document
    .querySelector("#today")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  function fcelsius(event) {
    event.preventDefault();
    document.querySelector("#gradus").innerHTML = Math.round(
      response.data.main.temp
    );
  }

  document.querySelector("#celsius").addEventListener("click", fcelsius);

  function ffarengeit(event) {
    event.preventDefault();
    document.querySelector("#gradus").innerHTML = Math.round(
      response.data.main.temp * 1.8 + 32
    );
  }
  document.querySelector("#farengeit").addEventListener("click", ffarengeit);
}
//
function search(city) {
  let apiKey = "2610fc391e59a1d4c413f050d38f672d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
search("Paris");
function func(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city").value;

  search(inputCity);
}
document.querySelector("#sity_search").addEventListener("click", func);

//CURRENT

document
  .querySelector("#searchCurrentPosition")
  .addEventListener("click", func2);

function func2(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(funcOfCurrentPosition);
  function funcOfCurrentPosition(position) {
    let apiKey = "2610fc391e59a1d4c413f050d38f672d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(showWeather);
  }
}
