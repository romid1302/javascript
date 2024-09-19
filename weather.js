const apiKey = "6d2b2a14d407f599f35b80842d7d8a07";
// const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const searchbtn = document.getElementById("search_btn");
const input = document.getElementById("input");
const weatherIcon = document.getElementById("weather-icon");
const weather = document.getElementById("weather");

searchbtn.onclick = function () {
  const inputValue = input.value;
  console.log(inputValue);
  checkWeather(inputValue);
};

async function checkWeather(inputValue) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric` +
      `&appid=${apiKey}`
  );
  const data = await response.json();
  console.log(data);

  if (data.cod == "404") {
    temperature.innerHTML = data.message;
    weatherIcon.src = "icon/clear-sky.png";
    city.innerHTML = " ";
    humidity.innerHTML = " ";
    wind.innerHTML = " ";
  } else {
    temperature.innerHTML = Math.ceil(data.main.temp) + ` °C`;
    city.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + ` %`;
    wind.innerHTML = Math.ceil(data.wind.speed) + `km/s`;
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "icon/clear-sky.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "icon/sun.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "icon/weather.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "icon/snowy.png";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "icon/haze.png";
    } else if (data.weather[0].main == "Wind") {
      weatherIcon.src = "icon/wind.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "icon/rain.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "icon/heavy-rain.png";
    }
  }
  weather.style.display = "flex";
}
