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
        database : "loja_26_1"
    }
})

api.get("/" , (req, res, next) => {
    res.json({resposta : 'Seja bem-vindo(a) á nossa API'})
})
