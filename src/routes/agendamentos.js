const express = require("express");
const controller = require("../controllers/agendamentos.controller");

const router = express.Router();

router.get("/agendamento/:id", controller.buscarUm);

router.get("/agendamentos", controller.buscarTodos);

router.post("/agendamento", controller.criar);

router.put("/agendamento/:id", controller.atualizar);

router.delete("/agendamento/:id", controller.excluir);

module.exports = router;