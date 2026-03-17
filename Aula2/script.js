function validar(){
    valor = document.getElementById("txtValor").value
    var divResult = document.getElementById("divResult")
    if (isNaN(valor) ){
        divResult.innerHTML = "Feijão com farinha!"
    }else if( valor <= 66 || valor >= 68){
        divResult.innerHTML = "Não é six seven"
    }else{
        divResult.innerHTML = "SIX SEVEN"
    }
}

function limpar(){
    document.getElementById("divResult").innerHTML = ""
}

$("#divJquery").css("background" , "#573")
$("#divJquery").css("color", "#fff")
$("#divJquery").html("Hello world o cacete <hr> >:(")

function mostrarMensagem(){
    alert("Cabou...")
}

$("#but").on("click",function(){
    $("#divJquery").toggle(3500, mostrarMensagem)
} )