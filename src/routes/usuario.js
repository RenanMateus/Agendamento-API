const express = require("express");
const controller = require("../controllers/usuario.controller");

const router = express.Router();

router.get("/usuario/:id", controller.buscarUm);

router.get("/usuarios", controller.buscarTodos);

router.post("/usuario", controller.criar);

router.post("/usuario/login", controller.login);

router.put("/usuario/:id", controller.atualizar);

router.delete("/usuario/:id", controller.excluir);

module.exports = router;