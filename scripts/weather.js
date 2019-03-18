const weatherDiv = document.querySelector('[data-weather]');

function date(timeStamp) {

    const date = new Date(timeStamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const monthDayYear = `${month}/${day}/2019`;
    return monthDayYear;
}

function formatTempHigh(weatherData) {
    const temp = weatherData.temperatureHigh;
    return `High: ${Math.round(temp)}`;
}

function formatTempLow(weatherData) {
    const temp = weatherData.temperatureLow;

    return `Low: ${Math.round(temp)}`;
}

function formatWind(weatherData) {
    const wind = weatherData.windSpeed;
    return `Wind speed(mph): ${Math.round(wind)}`;
}

// creates element with given data as text and adds it to the weather div
function addToWeather(textData) {
    const newElement = document.createElement('h2');
    newElement.textContent = textData;

    weatherDiv.appendChild(newElement);
}

// TODO; Implement sunrise and sunset info
function sunInfo(weatherData, timeOfDay) {
    const timeDataInSeconds = weatherData;

    const timeDataInMilliseconds = timeDataInSeconds * 1000;
    const sunriseTime = new Date(timeDataInMilliseconds);
    return sunriseTime;
}

// TODO; Implement sunrise and sunset info
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    const seconds = date.getSeconds();
    const formatted = `${hours}:${minutes}:${seconds}`;
    const monthDayYear = `${month}/${day}/2019`;

    return " " + formatted;
}


// The API blocks unknown hosts(). Orgin was null because static web page not running on server
// browser sends request to proxy server, proxy sends request to Api server, Api server sends request back to proxy, proxy sends back to browser
// Proxy is required to get around cross origin errors, solution found at below URL
// https://www.freecodecamp.org/forum/t/solved-having-trouble-getting-response-from-dark-sky-api/100653/4
const proxyURL = "https://cors-anywhere.herokuapp.com/"
const apiURL = "https://api.darksky.net/forecast/f22b7b7ec38d40287519c377962b3a24/33.753746,-84.386330";
const fullURL = proxyURL + apiURL;

fetch(fullURL)
    .then(function (response) {
        // To Test if resonse is working in console
        //console.log(response.json());
        return response.json();
    }).then(function (weatherData) {
        const dailyWeatherData = weatherData.daily.data[0];
        addToWeather(date(dailyWeatherData.time));
        addToWeather(formatTempHigh(dailyWeatherData));
        addToWeather(formatTempLow(dailyWeatherData));
        addToWeather(formatWind(dailyWeatherData));
        addToWeather('Sunrise: ' + (formatDate(sunInfo(dailyWeatherData.sunriseTime, 'sunrise'))));
        console.log(dailyWeatherData.sunriseTime);
        addToWeather('Sunset: ' + (formatDate(sunInfo(dailyWeatherData.sunsetTime, "sunset"))));
    }).catch((e) => {
        console.log('Error calling darksky api:', e);
    })

