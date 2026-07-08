const express = require("express");

const router = require("express").Router();

const DisciplinaController = require("../controllers/disciplina.controller");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", DisciplinaController.listar);

router.get("/:id", DisciplinaController.buscarPorId);

router.post("/", DisciplinaController.criar);

router.put("/:id", DisciplinaController.atualizar);

router.delete("/:id", DisciplinaController.excluir);

module.exports = router;




