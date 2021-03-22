const express = require("express");
const controller = require("../controllers/permissoes.controller");

const router = express.Router();

router.get("/permissoes", controller.buscarTodos);

module.exports = router;