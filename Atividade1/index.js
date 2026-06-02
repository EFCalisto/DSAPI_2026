const express = require("express")
const knex = require("knex")
const http_errors = require("http-errors")

const PORT = 8001
const HOSTNAME = "localhost"

const api = express()
api.use(express.json())
api.use(express.urlencoded({extended : true}))

const conn = knex({
    client : "mysql" ,
    connection : {
        host : HOSTNAME ,
        user: "root",
        password : "",
        database : "bd_dsapi"
    }
})

api.get("/" , (req, res, next) => {
    res.json({resposta : 'Seja bem-vindo(a) á nossa API'})
})

api.get("/product" , (req, res, next) => {
    conn("produtos")
    .leftJoin("categorias" , "produtos.codCategorias", "=", "categorias.id")
    .select("produtos.*", "categorias.nome AS cat")
    .then(dados => res.json( dados ))
    .catch( next )
})

api.get("/product/:idProd" , (req, res, next) => {
    const id = req.params.idProd
    conn("produtos")
    .leftJoin("categorias" , "produtos.codCategorias", "=", "categorias.id")
    .select("produtos.*", "categorias.nome AS cat")
    .where("produtos.id", id )
    .first()
    .then(dados => res.json( dados ))
    .catch( next )
})

api.get( "/category", (req, res, next) => {
    conn("categorias")
    .then( dados => res.json( dados ) )
    .catch( next )
})

api.get("/category/:idCat", (req, res, next) => {
    const id = req.params.idCat
    conn("categorias")
    .where("categorias.id", id)
    .first()
    .then(dados => res.json( dados ))
    .catch( next )
})

api.delete("/category/:idCat", (req, res, next) => {
    const id = req.params.idCat
    conn("categorias")
    .where("categorias.id", id)
    .delete()
    .then( dados => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao excluir"))
            }
            res.status(200).json( {
                resposta : "Categoria excluida" 
            } )
        })
    .catch( next )
})

api.delete("/product/:idProd", (req, res, next) => {
    const id = req.params.idProd
    conn("produtos")
    .where("produtos.id", id)
    .delete()
    .then( dados => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao excluir"))
            }
            res.status(200).json( {
                resposta : "Produto excluido" 
            } )
        })
    .catch( next )
})

api.post( "/category", (req, res, next) => {
    conn("categorias")
        .insert( req.body )
        .then( dados => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao inserir"))
            }
            res.status(201).json( {
                resposta : "Categoria inserido" ,
                id : dados[0]
            } )
        } )
        .catch( next )
})

api.put( "/category/:idCat", (req, res, next) => {
    const idCategorias = req.params.idCat
    conn("categorias")
        .where( "id" , idCategorias )
        .update( req.body )
        .then( dados => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao editar"))
            }
            res.status(200).json( {
                resposta : "Categoria editada" ,
            } )
        } )
        .catch( next )
})

api.post( "/product", (req, res, next) => {
    conn("produtos")
        .insert( req.body )
        .then( dados => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao inserir"))
            }
            res.status(201).json( {
                resposta : "Produto inserido" ,
                id : dados[0]
            } )
        } )
        .catch( next )
})

api.put( "/product/:idProd", (req, res, next) => {
    const idProduto = req.params.idProd
    conn("Produtos")
        .where( "id" , idProduto )
        .update( req.body )
        .then( dados => {
            if( !dados ){
                return next( http_errors( 404 , "Erro ao editar"))
            }
            res.status(200).json( {
                resposta : "Produto editado" ,
            } )
        } )
        .catch( next )
})

api.listen( PORT , ()=>{
    console.log( `Servidor rodando em: http://${HOSTNAME}:${PORT}` )
})
