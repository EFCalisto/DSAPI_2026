const API = "http://localhost:3000";

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "index.html";

}

async function carregarResumo(){

    await carregarDisciplinas();

    await carregarMetas();

    await carregarEntregas();

}

async function carregarDisciplinas(){

    const resposta = await fetch(API+"/disciplinas",{

        headers:{
            Authorization:"Bearer "+token
        }

    });

    const dados = await resposta.json();

    document.getElementById("totalDisciplinas").innerHTML = dados.length;

    window.disciplinas = dados;

}

async function carregarMetas(){

    const resposta = await fetch(API+"/metas",{

        headers:{
            Authorization:"Bearer "+token
        }

    });

    const dados = await resposta.json();

    document.getElementById("totalMetas").innerHTML = dados.length;

    window.metas = dados;

}

async function carregarEntregas(){

    const resposta = await fetch(API+"/entregas",{

        headers:{
            Authorization:"Bearer "+token
        }

    });

    const dados = await resposta.json();

    document.getElementById("totalEntregas").innerHTML = dados.length;

    window.entregas = dados;

}

function mostrar(tipo){

    const div = document.getElementById("conteudo");

    let dados = [];

    if(tipo==="disciplinas") dados = window.disciplinas;

    if(tipo==="metas") dados = window.metas;

    if(tipo==="entregas") dados = window.entregas;

    if(!dados || dados.length===0){

        div.innerHTML="<h3>Nenhum registro encontrado.</h3>";

        return;

    }

    let html="<table><tr>";

    Object.keys(dados[0]).forEach(campo=>{

        html+=`<th>${campo}</th>`;

    });

    html+="</tr>";

    dados.forEach(item=>{

        html+="<tr>";

        Object.values(item).forEach(valor=>{

            html+=`<td>${valor}</td>`;

        });

        html+="</tr>";

    });

    html+="</table>";

    div.innerHTML=html;

}

function logout(){

    localStorage.removeItem("token");

    window.location.href="index.html";

}

carregarResumo();