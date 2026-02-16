// Weather API configuration
const apiKey = '40c3365e79ba3d611ae736c9a2d54d90'; // You need to sign up for a free API key at openweathermap.org
const city = 'Salt Lake City';
const state = 'UT';
const country = 'US';
const units = 'imperial'; // For Fahrenheit

async function getWeatherData() {
    try {
        // First, get city coordinates
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.length) {
            throw new Error('City not found');
        }

        const { lat, lon } = geoData[0];

        // Get weather data using coordinates
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        displayCurrentWeather(weatherData);
        displayForecast(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector('.weather-container').innerHTML = '<p class="error">Unable to load weather data. Please try again later.</p>';
    }
}

function displayCurrentWeather(data) {
    const currentTemp = document.getElementById('current-temp');
    const weatherDesc = document.getElementById('weather-description');
    const weatherIcon = document.getElementById('weather-icon');
    const humidity = document.getElementById('humidity');

    if (data.list && data.list.length > 0) {
        const current = data.list[0];
        currentTemp.textContent = Math.round(current.main.temp);
        weatherDesc.textContent = current.weather[0].description;
        humidity.textContent = current.main.humidity;

        // Set weather icon
        const iconCode = current.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = current.weather[0].description;
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    if (data.list && data.list.length > 0) {
        // Get one forecast per day (around noon)
        const dailyForecasts = [];
        const today = new Date().setHours(0, 0, 0, 0);

        for (let i = 0; i < data.list.length; i++) {
            const forecast = data.list[i];
            const forecastDate = new Date(forecast.dt * 1000);
            const forecastDay = forecastDate.setHours(0, 0, 0, 0);

            // Get forecast around noon for each day after today
            if (forecastDay > today && forecastDate.getHours() >= 11 && forecastDate.getHours() <= 13) {
                if (!dailyForecasts.some(f => new Date(f.dt * 1000).setHours(0, 0, 0, 0) === forecastDay)) {
                    dailyForecasts.push(forecast);
                }
            }
        }

        // Display up to 3 days of forecast
        dailyForecasts.slice(0, 3).forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            const icon = day.weather[0].icon;

            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            forecastDay.innerHTML = `
                <p class="forecast-day-name">${dayName}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${day.weather[0].description}" width="40" height="40">
                <p class="forecast-temp">${temp}°F</p>
            `;

            forecastContainer.appendChild(forecastDay);
        });
    }
}

// Load weather data when page loads
document.addEventListener('DOMContentLoaded', getWeatherData);