//Importer le package "password-validator".
const passwordValidator = require("password-validator");

//Code sur "npm-validator" pour créer un schéma.
const  passwordSchema = new passwordValidator();

//Ajouter des proprietés à ce schéma.
passwordSchema
.is().min(5)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

//Exporter le module.
module.exports = (req, res, next) => {
    //Si le schéma est valide, passer à la fonction suivante. 
    if(passwordSchema.validate(req.body.password)) {
        next();
    }else{
        return res
        .status(400)
        .json({error : "Le mot de passe n'est pas assez fort" + " " + passwordSchema.validate('req.body.password', { list: true })})
    }
};