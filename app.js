import { state } from "./search.js";

const cache = {
    API_KEY: 'd63dfeee72b3e0fadcc8823978a770cd',
    local: {
        cityName: state.local.cityToSearch,
        date: new Date(),
        hour: new Date().getHours()
    },
    clime: {
        lat: null,
        lon: null,
        weatherForecast: null,
        airQuality: null, 
        classification_uv: null
    },
    images: {
        sun: './assets/week/sun-week.png',
        rain: './assets/week/rain-week.png',
        sunAndCloud: './assets/week/sunWeather-week.png',
        cloud: './assets/week/weather-week.png',
        thunderStorm: './assets/week/thunderstorm-week.png'

    },
};

const weatherCodes = {
    0: cache.images.sun,
    1: cache.images.sun,
    2: cache.images.sunAndCloud,
    3: cache.images.cloud,
    45: cache.images.cloud,
    48: cache.images.cloud,
    51: cache.images.rain,
    53: cache.images.rain,
    55: cache.images.rain,
    56: cache.images.rain,
    57: cache.images.rain,
    61: cache.images.rain,
    63: cache.images.rain,
    65: cache.images.rain,
    66: cache.images.rain,
    67: cache.images.rain,
    71: cache.images.rain,
    73: cache.images.rain,
    75: cache.images.rain,
    77: cache.images.cloud,
    80: cache.images.rain,
    81: cache.images.rain,
    82: cache.images.rain,
    85: cache.images.rain,
    86: cache.images.thunderStorm,
    95: cache.images.thunderStorm,
    96: cache.images.thunderStorm,
    99: cache.images.thunderStorm
};
const spanElement = document.querySelector('.hour');


//obter a latitude e longitude da cidade
async function getLatLon(cidade){
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=5&appid=${cache.API_KEY}`);
        const data = await response.json()
        cache.clime.lat = data[0].lat;
        cache.clime.lon = data[0].lon;
        cache.local.cityName = data[0].name;
        return { lat: cache.clime.lat.toFixed(4), lon: cache.clime.lon.toFixed(4) };

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }

}

//obter o clima com a latitude e longitude pega na função anterior
async function getWeatherForecast(lat, lon){
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=relativehumidity_2m,rain,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&current_weather=true&timezone=auto`, { timeout: 20000 });
        const data = await response.json()
        cache.clime.weatherForecast = data;
        return {weatherForecast: cache.clime.weatherForecast};

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }
}

//obter qualidade do ar
async function getAirQuality(lat, lon){
    try {
        const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index`, { timeout: 20000 });
        const data = await response.json()
        cache.clime.airQuality = data;
        return {airQuality: cache.clime.airQuality};

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }
}

//obter o dia da semana pelo dia do mes
function getDayforWeek(dataString){
    //"2023-11-20"
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const partesDaData = dataString.split('-');
    const ano = parseInt(partesDaData[0]);
    const mes = parseInt(partesDaData[1]) - 1; 
    const dia = parseInt(partesDaData[2]);
    const data = new Date(ano, mes, dia);
    const diaSemana = data.getDay();
  
   return diasDaSemana[diaSemana];
}

//classificar o indice de uv
function classifyUv(indiceUV){
    if (indiceUV == 0){
        cache.clime.classification_uv = 'Zero'
    } else if (indiceUV > 0 && indiceUV <= 2) {
        cache.clime.classification_uv = "Baixo";
    } else if (indiceUV >= 3 && indiceUV <= 5) {
        cache.clime.classification_uv = "Moderado";
    } else if (indiceUV >= 6 && indiceUV <= 7) {
        cache.clime.classification_uv = "Alto";
    } else if (indiceUV >= 8 && indiceUV <= 10) {
        cache.clime.classification_uv = "Muito Alto";
    } else {
        cache.clime.classification_uv = "Extremo";
    }
}


//função principal que pega os valores das funções para escrever no html
export async function writeInfoInHtml(){
    const { lat, lon } = await getLatLon(state.local.cityToSearch); //botar so a cidade diretooooooooooooooooooooooooooooooooooooooo
    const { weatherForecast } = await getWeatherForecast(lat, lon);
    const { airQuality } = await getAirQuality(lat, lon);
    //console.log(weatherForecast);
    
    const temperature = document.getElementById('temperature-now');
    const city = document.getElementById('city');
    const minTemp = document.getElementById('min-temp');
    const maxTemp = document.getElementById('max-temp');
    const relativeHumidity = document.getElementById('humidity');
    const rainPercentage = document.getElementById('rain');
    const windSpeed_10m = document.getElementById('wind-speed');

    //section1 temperature
    temperature.innerHTML = (weatherForecast.current_weather.temperature+1).toFixed(0);;
    minTemp.innerHTML = `${(weatherForecast.daily.temperature_2m_max[0]).toFixed(0)}°`;
    maxTemp.innerHTML = `${(weatherForecast.daily.temperature_2m_min[0]).toFixed(0)}°`;
    city.innerHTML = `${cache.local.cityName}, ${state.local.uf}`;
    relativeHumidity.innerHTML = `${weatherForecast.hourly.relativehumidity_2m[cache.local.hour]}%`;
    rainPercentage.innerHTML = `${weatherForecast.hourly.rain[cache.local.hour]}%`;

    //section2 other info
    const particulateMatter2Qtd = document.getElementById('particulate-matter2-qtd');
    const particulateMatter10Qtd = document.getElementById('particulate-matter10-qtd');
    const sulphurDioxide = document.getElementById('sulphur-dioxide');
    const nitrogenDioxide = document.getElementById('nitrogen-dioxide');
    const ozone = document.getElementById('ozone');
    const carbonMonoxide = document.getElementById('carbon-monoxide');
    const uvIndex = document.getElementById('uv-index');
    const classificationUv = document.getElementById('classification_uv');

    particulateMatter2Qtd.innerHTML = airQuality.hourly.pm2_5[cache.local.hour];
    particulateMatter10Qtd.innerHTML = airQuality.hourly.pm10[cache.local.hour];
    sulphurDioxide.innerHTML = airQuality.hourly.sulphur_dioxide[cache.local.hour];
    nitrogenDioxide.innerHTML = airQuality.hourly.nitrogen_dioxide[cache.local.hour];
    ozone.innerHTML = airQuality.hourly.ozone[cache.local.hour];
    carbonMonoxide.innerHTML = airQuality.hourly.carbon_monoxide[cache.local.hour];
    uvIndex.innerHTML = airQuality.hourly.uv_index[cache.local.hour];

    classifyUv(airQuality.hourly.uv_index[cache.local.hour]);
    classificationUv.innerHTML = cache.clime.classification_uv;

    const week = document.getElementsByClassName('day-week');

    for (let i = 0; i < 5; i++) {
        let code = weatherForecast.daily.weather_code[i];
        let img = weatherCodes[`${code}`];

        let day = weatherForecast.daily.time[i];
        const dayWeek = getDayforWeek(day); 
        const spanElement = week[i].querySelector('span');
        spanElement.innerHTML = dayWeek;

        let maxTemp = document.getElementById(`max-temp-day${i+1}`);
        let minTemp = document.getElementById(`min-temp-day${i+1}`);
        let newImg = document.getElementById(`img${i+1}`);
        newImg.src = img;

        maxTemp.innerText = `${(weatherForecast.daily.temperature_2m_max[i]).toFixed(0)}°`;
        minTemp.innerText = `${(weatherForecast.daily.temperature_2m_min[i]).toFixed(0)}°`;
    }

    const containerLoading = document.getElementById('container-loading');
    containerLoading.style.display = 'none';
    body.style.overflowY = 'scroll';

    
    insertDateInHtml();
}


//função para inserir a data e hora
function insertDateInHtml() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();

    const hour = date.getHours();
    const minutes = date.getMinutes();

    // 29/02/2024 - 21:48

    console.log(day.toString().length == 1)
    if (day.toString().length == 1) {
        day = `0${day}`;
    }
    if (month.toString.length == 1) {
        month = `0${month}`;
    }

    spanElement.innerText = `${day}/${month}/${year} - ${hour}:${minutes}`;
}

writeInfoInHtml()
