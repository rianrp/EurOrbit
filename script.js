const weatherConditions = {
    'clear': { icon: '☀️', name: 'CLEAR', dayIcon: '☀️', nightIcon: '🌙' },
    'cloudy': { icon: '☁️', name: 'CLOUDY', dayIcon: '☁️', nightIcon: '☁️' },
    'pcloudy': { icon: '🌤️', name: 'PARTLY CLOUDY', dayIcon: '🌤️', nightIcon: '🌙' },
    'mcloudy': { icon: '⛅', name: 'MOSTLY CLOUDY', dayIcon: '⛅', nightIcon: '☁️' },
    'lightrain': { icon: '🌦️', name: 'LIGHT RAIN', dayIcon: '🌦️', nightIcon: '🌧️' },
    'rain': { icon: '🌧️', name: 'RAIN', dayIcon: '🌧️', nightIcon: '🌧️' },
    'lightsnow': { icon: '🌨️', name: 'LIGHT SNOW', dayIcon: '🌨️', nightIcon: '🌨️' },
    'snow': { icon: '❄️', name: 'SNOW', dayIcon: '❄️', nightIcon: '❄️' },
    'humid': { icon: '💧', name: 'HUMID', dayIcon: '💧', nightIcon: '💧' },
    'oshower': { icon: '🌦️', name: 'SHOWERS', dayIcon: '🌦️', nightIcon: '🌧️' },
    'ishower': { icon: '🌧️', name: 'HEAVY RAIN', dayIcon: '🌧️', nightIcon: '🌧️' },
    'ts': { icon: '⛈️', name: 'THUNDERSTORM', dayIcon: '⛈️', nightIcon: '⛈️' },
    'tsrain': { icon: '⛈️', name: 'STORM', dayIcon: '⛈️', nightIcon: '⛈️' },
    'fog': { icon: '🌫️', name: 'FOG', dayIcon: '🌫️', nightIcon: '🌫️' },
    'windy': { icon: '💨', name: 'WINDY', dayIcon: '💨', nightIcon: '💨' }
};

let currentUnit = 'C'; 
let currentForecastData = null;

const citySelect = document.getElementById('citySelect');
const forecastContainer = document.getElementById('forecastContainer');
const loadingElement = document.getElementById('loading');
const errorMessageElement = document.getElementById('errorMessage');
const tempToggleBtn = document.getElementById('tempToggleBtn');
const temperatureUnit = document.getElementById('temperatureUnit');

citySelect.addEventListener('change', fetchWeatherData);
tempToggleBtn.addEventListener('change', toggleTemperatureUnit);

fetchWeatherData();

async function fetchWeatherData() {
    const selectedOption = citySelect.options[citySelect.selectedIndex];
    const [lat, lon] = citySelect.value.split(',');
    const cityName = selectedOption.text;

    showLoading(true);
    hideError();

    try {
        const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.dataseries || data.dataseries.length === 0) {
            throw new Error('No weather data available for this location');
        }
        
        currentForecastData = data.dataseries;
        displayWeatherForecast(currentForecastData, cityName);
        
    } catch (error) {
        showError(`Failed to fetch weather data: ${error.message}. Please try again later.`);
        console.error('Error fetching weather data:', error);
    } finally {
        showLoading(false);
    }
}

function displayWeatherForecast(forecastData, cityName) {
    forecastContainer.innerHTML = '';
    
    const sevenDayForecast = forecastData.slice(0, 7);
    
    sevenDayForecast.forEach((day, index) => {
        const card = createWeatherCard(day, index);
        forecastContainer.appendChild(card);
    });
}

function createWeatherCard(dayData, index) {
    const card = document.createElement('div');
    card.className = 'weather-card';
    
    if (index === 0) {
        card.classList.add('highlight');
    }
    
    const date = new Date();
    date.setDate(date.getDate() + index);
    const dateString = formatDate(date);
    
    const condition = weatherConditions[dayData.weather] || weatherConditions['clear'];
    
    const timepoint = dayData.timepoint || 12;
    const isNight = timepoint >= 18 || timepoint <= 6;
    
    const dayIcon = isNight ? condition.nightIcon : condition.dayIcon;
    const nightIcon = condition.nightIcon;
    
    const tempMax = convertTemperature(dayData.temp2m?.max || dayData.temp2m || 20);
    const tempMin = convertTemperature(dayData.temp2m?.min || dayData.temp2m - 5 || 15);
    
    const unitSymbol = currentUnit === 'C' ? '°C' : '°F';
    
    card.innerHTML = `
        <div class="date">${dateString}</div>
        <div class="weather-icons">
            <span class="weather-icon" aria-label="Day weather">${dayIcon}</span>
            <span class="weather-icon" aria-label="Night weather">${nightIcon}</span>
        </div>
        <div class="condition">${condition.name}</div>
        <div class="temperatures">
            <div class="temp-high">H: ${tempMax}${unitSymbol}</div>
            <div class="temp-low">L: ${tempMin}${unitSymbol}</div>
        </div>
    `;
    
    return card;
}

function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    
    return `${dayName} ${monthName} ${dayNumber}`;
}

function convertTemperature(celsius) {
    if (currentUnit === 'F') {
        return Math.round((celsius * 9/5) + 32);
    }
    return Math.round(celsius);
}

function toggleTemperatureUnit() {
    currentUnit = currentUnit === 'C' ? 'F' : 'C';
    
    if (currentUnit === 'C') {
        temperatureUnit.textContent = 'Using Celsius';
        tempToggleBtn.textContent = 'Switch to °F';
    } else {
        temperatureUnit.textContent = 'Using Fahrenheit';
        tempToggleBtn.textContent = 'Switch to °C';
    }
    
    if (currentForecastData) {
        const cityName = citySelect.options[citySelect.selectedIndex].text;
        displayWeatherForecast(currentForecastData, cityName);
    }
}

function showLoading(show) {
    if (show) {
        loadingElement.classList.remove('hidden');
        forecastContainer.classList.add('hidden');
    } else {
        loadingElement.classList.add('hidden');
        forecastContainer.classList.remove('hidden');
    }
}

function showError(message) {
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove('hidden');
}

function hideError() {
    errorMessageElement.classList.add('hidden');
    errorMessageElement.textContent = '';
}

tempToggleBtn.addEventListener('click', toggleTemperatureUnit);
