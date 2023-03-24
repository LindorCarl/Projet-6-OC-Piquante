//Importer "express" pour utiliser "router".
const express = require("express");
const router = express.Router();

//Importer le "controller".
const userController = require("../controllers/user");

//Importer le "middleware" pour contrôler l'email et le mot de passe.
const emailControl = require("../middleware/emailControl");
const passwordValidator = require("../middleware/passwordControl");

//La route (endpoint) signup.
router.post("/signup", emailControl, passwordValidator, userController.signup);

//La route login.
router.post("/login", userController.login);

//Exporter le module.
module.exports = router;