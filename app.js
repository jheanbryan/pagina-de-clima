// https://open-meteo.com

let API_KEY = "d63dfeee72b3e0fadcc8823978a770cd";
let city_name = 'aquidauana';

let lat, lon, weather, weatherForecast, airQuality, data_hora, classification_uv;

const date = new Date();
const hour = date.getHours()

//obter a latitude e longitude da cidade
async function getLatLon(){
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=5&appid=${API_KEY}`);
        const data = await response.json()
        lat = data[0].lat;
        lon = data[0].lon;
        city_name = data[0].name;
        return { lat: lat.toFixed(4), lon: lon.toFixed(4) };

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }

}

async function getWeatherForecast(lat, lon){
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=relativehumidity_2m,rain,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`, { timeout: 20000 });
        const data = await response.json()
        weatherForecast = data;
        console.log(weatherForecast);
        return {weatherForecast: weatherForecast};

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }
}

async function getAirQuality(lat, lon){
    try {
        const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index`, { timeout: 20000 });
        const data = await response.json()
        airQuality = data;
        return {airQuality: airQuality};

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }
}

function acharHora(lista_data_hora){
    for (let i = 0; i < Object.keys(lista_data_hora).length; i++) {
        var partes = lista_data_hora[i].split(/[-T:]/);
        var hora = parseInt(partes[3]);

        if (hora === hour) {
            pos = i;
            i = Object.keys(lista_data_hora).length;

        } else {
        }
    }
}

function obterDiaDaSemana(dataString){
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const partesDaData = dataString.split('-');
    const ano = parseInt(partesDaData[0]);
    const mes = parseInt(partesDaData[1]) - 1; 
    const dia = parseInt(partesDaData[2]);
    const data = new Date(ano, mes, dia);
    const diaSemana = data.getDay();
  
    dayWeek = diasDaSemana[diaSemana];
    console.log(dayWeek)
    return dayWeek;
  }

function classificarUV(indiceUV) {
    if (indiceUV >= 0 && indiceUV <= 2) {
        classification_uv = "Baixo";
    } else if (indiceUV >= 3 && indiceUV <= 5) {
        classification_uv = "Moderado";
    } else if (indiceUV >= 6 && indiceUV <= 7) {
        classification_uv = "Alto";
    } else if (indiceUV >= 8 && indiceUV <= 10) {
        classification_uv = "Muito Alto";
    } else {
        classification_uv = "Extremo";
    }
  }

//função principal que pega os valores das funções para escrever no html
async function writeInfoInHtml(){
    const { lat, lon } = await getLatLon();
    const { weatherForecast } = await getWeatherForecast(lat, lon);
    const { airQuality } = await getAirQuality(lat, lon);


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
    city.innerHTML = city_name;
    relativeHumidity.innerHTML = `${weatherForecast.hourly.relativehumidity_2m[hour]}%`;
    rainPercentage.innerHTML = `${weatherForecast.hourly.rain[hour]}%`;
    windSpeed_10m.innerHTML = `${weatherForecast.hourly.windspeed_10m[hour]} km/h`;

    //section2 other info
    const particulateMatter2Qtd = document.getElementById('particulate-matter2-qtd');
    const particulateMatter10Qtd = document.getElementById('particulate-matter10-qtd');
    const sulphurDioxide = document.getElementById('sulphur-dioxide');
    const nitrogenDioxide = document.getElementById('nitrogen-dioxide');
    const ozone = document.getElementById('ozone');
    const carbonMonoxide = document.getElementById('carbon-monoxide');
    const uvIndex = document.getElementById('uv-index');
    const classificationUv = document.getElementById('classification_uv');

    particulateMatter2Qtd.innerHTML = airQuality.hourly.pm2_5[hour];
    particulateMatter10Qtd.innerHTML = airQuality.hourly.pm10[hour];
    sulphurDioxide.innerHTML = airQuality.hourly.sulphur_dioxide[hour];
    nitrogenDioxide.innerHTML = airQuality.hourly.nitrogen_dioxide[hour];
    ozone.innerHTML = airQuality.hourly.ozone[hour];
    carbonMonoxide.innerHTML = airQuality.hourly.carbon_monoxide[hour];
    uvIndex.innerHTML = airQuality.hourly.uv_index[hour];

    classificarUV(airQuality.hourly.uv_index[hour]);
    classificationUv.innerHTML = classification_uv;


    const week = document.getElementsByClassName('day-week');


    let day, dayWeek;
    for (let i = 0; i < 5; i++) {
        console.log('\n Vou no elemento ' + i);
        day = weatherForecast.daily.time[i];
        console.log(day);
        const dayWeek = obterDiaDaSemana(day); 
        const spanElement = week[i].querySelector('span');
        spanElement.innerHTML = dayWeek;

        let maxTemp = document.getElementById(`max-temp-day${i+1}`);
        let minTemp = document.getElementById(`min-temp-day${i+1}`);

        maxTemp.innerText = `${(weatherForecast.daily.temperature_2m_max[i]).toFixed(0)}°`;
        minTemp.innerText = `${(weatherForecast.daily.temperature_2m_min[i]).toFixed(0)}°`;
    }

}

writeInfoInHtml();
