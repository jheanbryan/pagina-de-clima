const inputEstados = document.getElementById('input-estados')
const inputCidades = document.getElementById('input-cidades')
const content = document.querySelector('.content');
const contentCidades = document.querySelector('.content-cidades');
let divEstado, dataJson, cidadesDisponiveis;
carregarJsonEstadosCidades();

let estados = [
    {"nome": "Acre", "sigla": "AC"},
    {"nome": "Alagoas", "sigla": "AL"},
    {"nome": "Amapá", "sigla": "AP"},
    {"nome": "Amazonas", "sigla": "AM"},
    {"nome": "Bahia", "sigla": "BA"},
    {"nome": "Ceará", "sigla": "CE"},
    {"nome": "Distrito Federal", "sigla": "DF"},
    {"nome": "Espírito Santo", "sigla": "ES"},
    {"nome": "Goiás", "sigla": "GO"},
    {"nome": "Maranhão", "sigla": "MA"},
    {"nome": "Mato Grosso", "sigla": "MT"},
    {"nome": "Mato Grosso do Sul", "sigla": "MS"},
    {"nome": "Minas Gerais", "sigla": "MG"},
    {"nome": "Pará", "sigla": "PA"},
    {"nome": "Paraíba", "sigla": "PB"},
    {"nome": "Paraná", "sigla": "PR"},
    {"nome": "Pernambuco", "sigla": "PE"},
    {"nome": "Piauí", "sigla": "PI"},
    {"nome": "Rio de Janeiro", "sigla": "RJ"},
    {"nome": "Rio Grande do Norte", "sigla": "RN"},
    {"nome": "Rio Grande do Sul", "sigla": "RS"},
    {"nome": "Rondônia", "sigla": "RO"},
    {"nome": "Roraima", "sigla": "RR"},
    {"nome": "Santa Catarina", "sigla": "SC"},
    {"nome": "São Paulo", "sigla": "SP"},
    {"nome": "Sergipe", "sigla": "SE"},
    {"nome": "Tocantins", "sigla": "TO"}

];
let estado, cidade;
for (let i = 0; i < estados.length; i++) {
    estado = estados[i].nome;
    //console.log(estado);
    addHtml(estado, content);
}

inputEstados.addEventListener('focus', function(){
    content.style.display = 'flex';
})

inputCidades.addEventListener('focus', function(){
    contentCidades.style.display = 'flex';
})

function addHtml(item, localParaAdicionar){
    const div = document.createElement('div');
    div.innerHTML = item;
    localParaAdicionar.append(div);
    div.classList.add('div');
}

inputEstados.addEventListener('input', function() {
    const filtro = inputEstados.value.toLowerCase();
    console.log('inputou')
    content.innerHTML = "";
    
    estados
        .filter((estado) => estado.nome.toLowerCase().includes(filtro))
        .forEach((estado) => addHtml(estado.nome, content));
});




function carregarJsonEstadosCidades(){
    fetch('estados-cidades.json')
        .then(response => response.json())
        .then(data => {
            // Use dataJsonN aqui
            dataJson = data.estados;
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}


content.addEventListener('click', function(event){
    
    if (event.target.tagName === 'DIV') {
        const estado = event.target.textContent;
        console.log(estado);

        inputEstados.value = estado;
        content.style.display = 'none';


        for (let i = 0; i < dataJson.length; i++) {
            if(dataJson[i].nome == estado){
                cidadesDisponiveis = dataJson[i].cidades;
            }
        }

        while (contentCidades.firstChild) {
            contentCidades.removeChild(contentCidades.firstChild);
        }

        //adicionar cidades disponiveis no html
        for(let i = 0; i < cidadesDisponiveis.length; i++){
            console.log(cidadesDisponiveis[i]);
            addHtml(cidadesDisponiveis[i], contentCidades);
        }
        
    }

})

inputCidades.addEventListener('input', function() {
    const filtro = inputCidades.value.toLowerCase();
    contentCidades.innerHTML = "";
    
    cidadesDisponiveis
        .filter((cidade) => cidades.nome.toLowerCase().includes(filtro))
        .forEach((cidade) => addHtml(estado.nome, contentCidades));
});
/*
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