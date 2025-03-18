const express = require("express");
const router = express.Router();
const coordenadorController = require("../controllers/coordenadorController");

router.post("/login", coordenadorController.login);
router.post("/registrar", coordenadorController.registrar);

module.exports = router;
