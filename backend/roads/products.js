//Importer le package "express".
const express = require("express");

//Utiliser Router de "express" pour écrire les routes.
const router = express.Router();

//Importer les "middleware" à mettre sur les routes. 
const authentification = require("../middleware/authentification");
const multer = require("../middleware/multer");

//Importer les "controllers" à envoyer dans la database.
const controllerProducts = require("../controllers/products");
const controllerLikes = require("../controllers/likes");

//Créer les routes du CRUD.
    //CREATE
router.post("/sauces", authentification, multer, controllerProducts.createProducts);
    //READ
router.get("/sauces", authentification, controllerProducts.getAllProducts);
router.get("/sauces/:id", authentification, controllerProducts.getOneProduct);
    //UPDATE
router.put("/sauces/:id", authentification, multer, controllerProducts.updateOneProduct);
    //DELETE
router.delete("/sauces/:id", authentification, controllerProducts.deleteOneProduct);

//La route pour les "like".
router.post("/sauces/:id/like", authentification, controllerLikes.likeProducts);

//Exporter le module.
module.exports = router; 