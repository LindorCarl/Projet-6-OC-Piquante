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
        //Absence du token dans authentification.
        if(token == null){
            return res.status(401).json({message : "Token ne peut pas être null"});
        }

        //Décoder le token.
        jwt.verify(
            token, `${process.env.TOKEN}`, 
            (err) => {
                if(err){
                    res.status(401).json({message : "Token Invalid" + err});
                }else{
                    next();
                }
            }
        );
    }catch(error){
        res.status(403).json({
            message : "Echec Authentification",
            error : error 
        });
    }
};

