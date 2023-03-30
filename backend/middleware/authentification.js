//Importer json web token et la variable d'environnement.
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//Exporter la fonction du middleware.
module.exports = (req, res, next) => {
    try{
        //Localiser le token.
        const header = req.headers.authorization
        //Absence de header.
        if(header == null){
            return res.status(401).json({message : "Invalid"});
        }
        //Récupérer le token.
        const token = header.split(" ")[1];
        //Décoder le token.
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        const userId = decodedToken.userId;
        //Comparer l'userId de la requête à celui du token.
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    }catch(error){
        res.status(403).json({
            message : "Echec Authentification",
            error : error 
        });
    }
};

