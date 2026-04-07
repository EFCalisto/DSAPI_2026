function lerJSON(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse(this.response)
            var txt ="Nome: "+ objJSON.nome +"<br>";
            txt += "Idade: " + objJSON.idade +"<br>";
            txt += "Formações: " ;
            objJSON.formacoes.forEach( formacao => {
                txt += formacao + " - "
                
            });
            if(objJSON.casado){
                txt += "<br>Cônjuge: " + objJSON.conjuge.nome;
            }
            txt += "<br>Filhos: ";
            objJSON.filhos.forEach( filho => {
                txt +="<br>" + filho.nome + "Idade: " + filho.idade;
            });
            document.getElementById("divJSON").innerHTML = txt;
         }
    }

    req.open("GET" , "dados.json", true);
    req.send();
}


function lerProdutos(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse(this.responseText);
            var produtos = objJSON.produtos;
            var txt = "";
            if(produtos.lenght ==0 ){
                txt = "<tr><th>Nenhum produto cadastrado!</th></tr>"
            }else{

                txt +=    "<tr>";
                txt +=    "    <th> Código </th>";
                txt +=    "    <th> Nome </th>";
                txt +=    "    <th> Preço </th>";
                txt +=    "    <th> Excluir </th>";
                txt +=    "</th>";
                produtos.forEach(prod =>{
                    txt += "<tr>";
                    txt += "    <td>" + prod.id + "</td>";
                    txt += "    <td>" + prod.nome + "</td>";
                    txt += "    <td>" + prod.preco + "</td>";
                    txt += "    <td><button onclick='deletar(" + prod.id + ")'> X </button></td>";
                    txt += "</tr>";
                })
            }
            document.getElementById("tblProdutos").innerHTML = txt;
        }
    }
    req.open("GET", "servidor.php?buscar", true);
    req.send();
}

function deletar( idProd ){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState == 4){
            var objJSON = JSON.parse(this.responseText );
            if( objJSON.resposta ){
                alert("Produto excluido com sucesso");
                lerProdutos();
            }
                
        }

    };
    req.open("GET", "servidor.php?excluir&idProduto=" + idProd, true);
    req.send();
}