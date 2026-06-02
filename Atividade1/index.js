const express = require("express");
const knex = require("knex");
const httpErrors = require("http-errors");

const PORT = 8001;
const HOST = "localhost";

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

const conn = knex({
    client: "mysql2",
    connection: {
        host: HOST,
        user: "root",
        password: "",
        database: "bd_dsapi"
    }
});

api.get("/", (req, res) => {
    res.json({
        mensagem: "API Loja Online"
    });
});


api.get("/clientes", async (req, res, next) => {
    try {
        const dados = await conn("clientes")
            .leftJoin("cidades", "clientes.cidade_id", "cidades.id")
            .select(
                "clientes.*",
                "cidades.nome as cidade"
            );

        res.json(dados);
    }
    catch (err) {
        next(err);
    }
});

api.get("/clientes/:id", async (req, res, next) => {
    try {
        const cliente = await conn("clientes")
            .where("id", req.params.id)
            .first();

        if (!cliente)
            throw httpErrors.NotFound("Cliente não encontrado");

        res.json(cliente);
    }
    catch (err) {
        next(err);
    }
});

api.post("/clientes", async (req, res, next) => {
    try {
        await conn("clientes").insert(req.body);

        res.status(201).json({
            mensagem: "Cliente cadastrado"
        });
    }
    catch (err) {
        next(err);
    }
});

api.put("/clientes/:id", async (req, res, next) => {
    try {
        await conn("clientes")
            .where("id", req.params.id)
            .update(req.body);

        res.json({
            mensagem: "Cliente atualizado"
        });
    }
    catch (err) {
        next(err);
    }
});

api.delete("/clientes/:id", async (req, res, next) => {
    try {
        await conn("clientes")
            .where("id", req.params.id)
            .del();

        res.json({
            mensagem: "Cliente removido"
        });
    }
    catch (err) {
        next(err);
    }
});

api.get("/cidades", async (req, res, next) => {
    try {
        const cidades = await conn("cidades");
        res.json(cidades);
    }
    catch (err) {
        next(err);
    }
});

api.get("/cidades/:id", async (req, res, next) => {
    try {
        const cidade = await conn("cidades")
            .where("id", req.params.id)
            .first();

        res.json(cidade);
    }
    catch (err) {
        next(err);
    }
});

api.post("/cidades", async (req, res, next) => {
    try {
        await conn("cidades").insert(req.body);

        res.status(201).json({
            mensagem: "Cidade cadastrada"
        });
    }
    catch (err) {
        next(err);
    }
});

api.get("/categorias", async (req, res, next) => {
    try {
        res.json(await conn("categorias"));
    }
    catch (err) {
        next(err);
    }
});

api.get("/categorias/:id", async (req, res, next) => {
    try {
        const categoria = await conn("categorias")
            .where("id", req.params.id)
            .first();

        res.json(categoria);
    }
    catch (err) {
        next(err);
    }
});

api.post("/categorias", async (req, res, next) => {
    try {
        await conn("categorias").insert(req.body);

        res.status(201).json({
            mensagem: "Categoria criada"
        });
    }
    catch (err) {
        next(err);
    }
});

api.put("/categorias/:id", async (req, res, next) => {
    try {
        await conn("categorias")
            .where("id", req.params.id)
            .update(req.body);

        res.json({
            mensagem: "Categoria atualizada"
        });
    }
    catch (err) {
        next(err);
    }
});

api.delete("/categorias/:id", async (req, res, next) => {
    try {
        await conn("categorias")
            .where("id", req.params.id)
            .del();

        res.json({
            mensagem: "Categoria removida"
        });
    }
    catch (err) {
        next(err);
    }
});


api.get("/produtos", async (req, res, next) => {
    try {
        const produtos = await conn("produtos")
            .leftJoin(
                "categorias",
                "produtos.categoria_id",
                "categorias.id"
            )
            .select(
                "produtos.*",
                "categorias.nome as categoria"
            );

        res.json(produtos);
    }
    catch (err) {
        next(err);
    }
});

api.get("/produtos/:id", async (req, res, next) => {
    try {
        const produto = await conn("produtos")
            .where("id", req.params.id)
            .first();

        if (!produto)
            throw httpErrors.NotFound("Produto não encontrado");

        res.json(produto);
    }
    catch (err) {
        next(err);
    }
});

api.post("/produtos", async (req, res, next) => {
    try {
        await conn("produtos").insert(req.body);

        res.status(201).json({
            mensagem: "Produto criado"
        });
    }
    catch (err) {
        next(err);
    }
});

api.put("/produtos/:id", async (req, res, next) => {
    try {
        await conn("produtos")
            .where("id", req.params.id)
            .update(req.body);

        res.json({
            mensagem: "Produto atualizado"
        });
    }
    catch (err) {
        next(err);
    }
});

api.delete("/produtos/:id", async (req, res, next) => {
    try {
        await conn("produtos")
            .where("id", req.params.id)
            .del();

        res.json({
            mensagem: "Produto removido"
        });
    }
    catch (err) {
        next(err);
    }
});

api.get("/pedidos", async (req, res, next) => {
    try {
        const pedidos = await conn("pedidos")
            .leftJoin(
                "clientes",
                "pedidos.cliente_id",
                "clientes.id"
            )
            .select(
                "pedidos.*",
                "clientes.nome as cliente"
            );

        res.json(pedidos);
    }
    catch (err) {
        next(err);
    }
});

api.get("/pedidos/:id", async (req, res, next) => {
    try {
        const pedido = await conn("pedidos")
            .where("id", req.params.id)
            .first();

        const itens = await conn("pedidos_produtos")
            .leftJoin(
                "produtos",
                "pedidos_produtos.produto_id",
                "produtos.id"
            )
            .where("pedido_id", req.params.id)
            .select(
                "produtos.nome",
                "pedidos_produtos.preco",
                "pedidos_produtos.quantidade"
            );

        res.json({
            pedido,
            itens
        });
    }
    catch (err) {
        next(err);
    }
});

api.post("/pedidos", async (req, res, next) => {
    try {

        const {
            endereco,
            cliente_id,
            produtos
        } = req.body;

        const [pedido_id] = await conn("pedidos")
            .insert({
                endereco,
                cliente_id
            });

        for (const p of produtos) {

            const produto = await conn("produtos")
                .where("id", p.produto_id)
                .first();

            await conn("pedidos_produtos")
                .insert({
                    pedido_id,
                    produto_id: p.produto_id,
                    preco: produto.preco,
                    quantidade: p.quantidade
                });
        }

        res.status(201).json({
            mensagem: "Pedido realizado",
            pedido_id
        });

    }
    catch (err) {
        next(err);
    }
});

api.delete("/pedidos/:id", async (req, res, next) => {
    try {

        await conn("pedidos_produtos")
            .where("pedido_id", req.params.id)
            .del();

        await conn("pedidos")
            .where("id", req.params.id)
            .del();

        res.json({
            mensagem: "Pedido removido"
        });

    }
    catch (err) {
        next(err);
    }
});

api.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        erro: err.message
    });
});

api.listen(PORT, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});