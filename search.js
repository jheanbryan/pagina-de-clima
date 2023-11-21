import { writeInfoInHtml } from './app.js';

const state = {
    domElements: {
        inputEstados: document.getElementById('input-estados'),
        inputCidades: document.getElementById('input-cidades'),
        content:  document.querySelector('.content'),
        contentCidades: document.querySelector('.content-cidades'),
        containerLoading: document.getElementById('container-loading'),
        body: document.getElementById('body')
    },
    local: {
        cityToSearch: 'aquidauana',
        uf: 'MS',
        estado: null, 
        cidade: null
    },
    data: {
        dataJson: null,
        cidadesDisponiveis: null,
    }

}

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


for (let i = 0; i < estados.length; i++) {
    state.local.estado = estados[i].nome;
    //console.log(estado);
    addHtml(state.local.estado, state.domElements.content);
}

state.domElements.inputEstados.addEventListener('focus', function(){
    state.domElements.content.style.display = 'flex';
})

state.domElements.inputCidades.addEventListener('focus', function(){
    state.domElements.contentCidades.style.display = 'flex';
})

function addHtml(item, localParaAdicionar){
    const div = document.createElement('div');
    div.innerHTML = item;
    localParaAdicionar.append(div);
    div.classList.add('div');
}

state.domElements.inputEstados.addEventListener('input', function() {
    const filtro = state.domElements.inputEstados.value.toLowerCase();
    console.log('inputou')
    state.domElements.content.innerHTML = "";
    
    estados
        .filter((estado) => estado.nome.toLowerCase().includes(filtro))
        .forEach((estado) => addHtml(estado.nome, content));
});


function carregarJsonEstadosCidades(){
    fetch('estados-cidades.json')
        .then(response => response.json())
        .then(data => {
            // Use dataJsonN aqui
            state.data.dataJson = data.estados;
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}


state.domElements.content.addEventListener('click', function(event){
    
    if (event.target.tagName === 'DIV') {
        const estado = event.target.textContent;
        console.log(estado);

        state.domElements.inputEstados.value = estado;
        state.domElements.content.style.display = 'none';


        for (let i = 0; i < state.data.dataJson.length; i++) {
            if(state.data.dataJson[i].nome == estado){
                state.local.uf = state.data.dataJson[i].sigla;
                state.data.cidadesDisponiveis = state.data.dataJson[i].cidades;
            }
        }

        while (contentCidades.firstChild) {
            state.domElements.contentCidades.removeChild(contentCidades.firstChild);
        }

        //adicionar cidades disponiveis no html
        for(let i = 0; i < state.data.cidadesDisponiveis.length; i++){
            //console.log(cidadesDisponiveis[i]);
            addHtml(state.data.cidadesDisponiveis[i], state.domElements.contentCidades);
        }
        
    }

})

state.domElements.contentCidades.addEventListener('click', function(event){
    if (event.target.tagName === 'DIV') {
        const cidade = event.target.textContent;
        console.log(cidade);
        
        state.domElements.inputCidades.value = cidade;
        state.local.cityToSearch = cidade
        state.domElements.contentCidades.style.display = 'none';
        state.domElements.containerLoading.style.display = 'flex';
        state.domElements.body.style.overflowY = 'hidden';
        writeInfoInHtml();
    }
})


export{ state };