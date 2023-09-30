const inputEstados = document.getElementById('input-estados')
const inputCidades = document.getElementById('input-cidades')
const content = document.querySelector('.content');

let estados = ['MS', 'MT', 'RS', 'DF'];

function addHtml(item){
    const div = document.createElement('div');
    div.innerHTML = item;
    content.append(div)
}

addHtml(estados);

/*
btnSearch.addEventListener('click', function(){
    console.log(cityName)
})

document.body.addEventListener('keypress', function (event) {
    const key = event.key;
    console.log('pressionou')
    if(key == 'Enter' && cityName != ''){
        console.log('deu enter'); 

        function ler(){
            console.log('to no ler')
            const { lista } = searchCity(cityName);
            console.log(lista);
            verificarEstado(estado, lista);
        }
        ler();
    };
});


async function searchCity(cityName){
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=pt&format=json`, { timeout: 20000 });
        const data = await response.json()
        lista = data.results;
        console.log(lista)
        return {lista: lista};

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        console.error("Erro:", error.response);
    }

}

function verificarEstado(estado, lista){
    console.log(lista)
    for (let i = 0; i < lista.length; i++) {
        if(lista[i].admin1 == estado){
            console.log('achei');
        }
    }   



}




function split(name){
    let nameEsplitado = name.split(' ');
    console.log(nameEsplitado)

}
*/