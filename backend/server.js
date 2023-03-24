//Pour les requêtes http.
const http = require("http");

//Importer la variable d'environnement pour sécuriser les données sensibles.
const dotenv = require("dotenv");
const result = dotenv.config()

//Importer app.js pour récupérer ses fonctions.
const app = require("../backend/app");

//Paramétrage du server grâce à ".set" de "express".
app.set("port", process.env.PORT);

//Création du server.
const server = http.createServer(app);

//Le server écoute les requêtes sur le port.
server.listen(process.env.PORT, () => {
    console.log(`Serveur en écoute sur le port ${process.env.PORT}`)
});