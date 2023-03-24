//Installer et importater le framework "express".
const express = require("express");

//Créer la variable à exporter.
const app = express();

//Importer le fichier database.
const mongoose = require("../backend/database");

//Importer la route signup et login.
const userRoads = require("../backend/roads/user");

//Importer la route products (sauces).
const productsRoads = require("../backend/roads/products");

//Importer "path" de node.js pour travailler avec les chemins de fichiers.
const path = require("path");

//Logger les requêtes et les réponses. 
const morgan = require("morgan");

//Débugger mongoose.
mongoose.set("debug", true);

//Gérer les problèmes de CORS.
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

//Transformer le body en JSON. 
app.use(express.json());

//App.use pour utiliser "morgan" sur toutes les routes.
app.use(morgan("dev"));

//Création de la première route.
app.use("/api/auth", userRoads);

//Création de la route des produits
app.use("/api", productsRoads);

//Accéder à l'image avec la fonction middleware "express.static".
app.use("/images", express.static(path.join(__dirname, "images")));

//Exporter app.js pour pouvoir y accéder depuis un autre fichier. 
module.exports = app