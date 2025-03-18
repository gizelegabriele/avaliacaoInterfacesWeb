const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");

router.get("/", alunoController.obterTodosAlunos);
router.post("/", alunoController.criarAluno);
router.delete("/:id", alunoController.deletarAluno);
router.put("/:id", alunoController.editarAluno);

module.exports = router;