function dados(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if( this.readyState == 3){
            alert("Servidor processando sua requisição");
        }
        if( this.readyState == 4 && this.status == 200){
            var divConteudo = document.getElementById("conteudo");
            divConteudo.innerHTML = this.responseText;
        }
    }

    req.open("GET", "dados.txt" , true);
    req.send()
}