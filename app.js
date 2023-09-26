// https://open-meteo.com

let API_KEY = "";
let city_name = 'aquidauana';

let lat, lon, weather, weatherForecast;

//obter a latitude e longitude da cidade
async function getLatLon(){
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=5&appid=${API_KEY}`);
        const data = await response.json()
        lat = data[0].lat;
        lon = data[0].lon;
        city_name = data[0].name;
        return { lat: lat, lon: lon };

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }

}

//obter as informações do clima com base na latitude e longitude
async function getWeather(lat, lon){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`);
        const data = await response.json()
        weather = data;
        return {weather: weather};

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }
}

async function getWeatherForecast(lat, lon){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${API_KEY}`);
        const data = await response.json()
        weatherForecast = data;
        return {weatherForecast: weatherForecast};

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }
}

//função principal que pega os valores das funções para escrever no html
async function writeInfoInHtml(){
    const { lat, lon } = await getLatLon();
    const { weather } = await getWeather(lat, lon);
    const { weatherForecast } = await getWeatherForecast(lat, lon);
    console.log(weather);

    const temperature = document.getElementById('temperature-now');
    const city = document.getElementById('city');
    const minTemp = document.getElementById('min-temp');
    const maxTemp = document.getElementById('max-temp');
    temperature.innerHTML = weather.main.temp.toFixed(0);
    minTemp.innerHTML = `${weather.main.temp_min.toFixed(0)}°`;
    maxTemp.innerHTML = `${weather.main.temp_max.toFixed(0)}°`;
    city.innerHTML = city_name;
}

writeInfoInHtml();
