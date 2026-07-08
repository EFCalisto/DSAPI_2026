const express = require("express");

const router = require("express").Router();

const MetaController = require("../controllers/meta.controller");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", MetaController.listar);

router.get("/:id", MetaController.buscarPorId);

router.post("/", MetaController.criar);

router.put("/:id", MetaController.atualizar);

router.delete("/:id", MetaController.excluir);

module.exports = router;