async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('result');

  if (!city) {
    resultDiv.innerHTML = '<p id="error">Please enter a city name.</p>';
    return;
  }

  resultDiv.innerHTML = 'Loading...';

  const API_KEY = "13d53706157fdb0a2fcc9d6b8225ec12"; // yahan apna API key use karo
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      resultDiv.innerHTML = `<p id="error">${data.message}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h3>${data.name}</h3>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
      <p><strong>Min Temp:</strong> ${data.main.temp_min}°C</p>
      <p><strong>Max Temp:</strong> ${data.main.temp_max}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
    `;

    console.log("Weather Details :", data);

  } catch (err) {
    console.error('Client Error:', err);
    resultDiv.innerHTML = '<p id="error">Something went wrong. Try again.</p>';
  }
}
