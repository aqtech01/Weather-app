"use strict";
const apiKey = "5b184427ebb649188a11c94d7718f56f";

const weatherData = document.querySelector("#weather-data");
const city = document.querySelector("#city");

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = city.value;

  getWeatherData(cityValue);
});

const getWeatherData = async (cityName) => {
  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    if (!resp.ok) {
      throw new Error("Network Response was not ok");
    }
    const data = await resp.json();
    console.log(data);

    // Update the weather data element with fetched data
    document.getElementById("temperature").innerHTML = `${data.main.temp}°C`;
    document.getElementById("description").innerHTML =
      data.weather[0].description;
    document.getElementById(
      "feels-like"
    ).innerHTML = `Feels Like: ${data.main.feels_like}°C`;
    document.getElementById(
      "humidity"
    ).innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById(
      "wind-speed"
    ).innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

    // Update the weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById(
      "weather-icon"
    ).src = `http://openweathermap.org/img/wn/${iconCode}.png`;
  } catch (error) {
    console.error("Fetching weather data failed:", error);
    weatherData.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
  }
};
