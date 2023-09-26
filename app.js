// https://open-meteo.com

let API_KEY = "digitar a key aqui";
let city_name = 'aquidauana';

let lat, lon, weather;

//obter a latitude e longitude da cidade
async function getLatLon(){
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=5&appid=${API_KEY}`);
        const data = await response.json()
        lat = data[0].lat;
        lon = data[0].lon;
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

//função principal que pega os valores das funções para escrever no html
async function writeInfoInHtml(){
    const { lat, lon } = await getLatLon();
    const { weather } = await getWeather(lat, lon);
    console.log(weather);
}

writeInfoInHtml();
