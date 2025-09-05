// script.js
const apiKey = "b19425888a0d18776ad8ded5d260bd2a"; // Replace with your OpenWeatherMap API key

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name!");

  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      },
      () => {
        alert("Location access denied or unavailable.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        document.getElementById("weatherDisplay").innerHTML = `<p>City not found!</p>`;
        return;
      }

      const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡 Temp: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
      `;
      document.getElementById("weatherDisplay").innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("weatherDisplay").innerHTML = `<p>Something went wrong. Try again.</p>`;
    });
}
