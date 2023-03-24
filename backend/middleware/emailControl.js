//Importer le package "validator" pour contrôler la validité de l'email.
const validator = require("validator");

//Exporter le module.
module.exports = (req, res, next) => {
    const {email} = req.body;
    //Si l'email est valide, passer à la fonction suivante.
    if(validator.isEmail(email)){
        next();
    }else{
        return res
        .status(400)
        .json({error : ` l'email ${email} n'est pas valide`});
    }
};