import { writeInfoInHtml } from './app.js';

const inputEstados = document.getElementById('input-estados')
const inputCidades = document.getElementById('input-cidades')
const content = document.querySelector('.content');
const contentCidades = document.querySelector('.content-cidades');
const containerLoading = document.getElementById('container-loading');

let divEstado, dataJson, cidadesDisponiveis;
carregarJsonEstadosCidades();

let cidadeParaBuscar = 'aquidauana';
let uf = 'MS'
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
                uf = dataJson[i].sigla;
                cidadesDisponiveis = dataJson[i].cidades;
            }
        }

        while (contentCidades.firstChild) {
            contentCidades.removeChild(contentCidades.firstChild);
        }

        //adicionar cidades disponiveis no html
        for(let i = 0; i < cidadesDisponiveis.length; i++){
            //console.log(cidadesDisponiveis[i]);
            addHtml(cidadesDisponiveis[i], contentCidades);
        }
        
    }

})

contentCidades.addEventListener('click', function(event){
    if (event.target.tagName === 'DIV') {
        const cidade = event.target.textContent;
        console.log(cidade);
        
        inputCidades.value = cidade;
        cidadeParaBuscar = cidade
        contentCidades.style.display = 'none';
        containerLoading.style.display = 'flex';
        writeInfoInHtml();
    }
})


export{ cidadeParaBuscar, uf };