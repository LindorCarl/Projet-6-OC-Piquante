//Importer la variable d'environnement pour protéger la Database. 
const dotenv = require("dotenv");
const result = dotenv.config();

//Importer le package Mongoose pour se connecter à la BD.
const mongoose = require("mongoose");
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log ("Connexion à MongoDB réussi"))
    .catch((err) => console.log ("Connexion à MongoDB échoué", err));

//Pour lier ce fichier à app.js.
module.exports = mongoose;