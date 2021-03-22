const express = require("express");
const controller = require("../controllers/pendencia.controller");

const router = express.Router();

router.get("/pendencia/:id", controller.buscarUm);

router.get("/pendencias", controller.buscarTodos);

router.post("/pendencia", controller.criar);

router.put("/pendencia/:id", controller.atualizar);

router.delete("/pendencia/:id", controller.excluir);

module.exports = router;