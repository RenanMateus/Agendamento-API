const express = require("express");
const controller = require("../controllers/perfil.controller");

const router = express.Router();

router.get("/perfil/:id", controller.buscarUm);

router.get("/perfis", controller.buscarTodos);

router.post("/perfil", controller.criar);

router.put("/perfil/:id", controller.atualizar);

router.delete("/perfil/:id", controller.excluir);

module.exports = router;