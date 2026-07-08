const express = require("express");

const router = require("express").Router();

const EntregaController = require("../controllers/entrega.controller");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", EntregaController.listar);

router.get("/:id", EntregaController.buscarPorId);

router.post("/", EntregaController.criar);

router.put("/:id", EntregaController.atualizar);

router.delete("/:id", EntregaController.excluir);

module.exports = router;