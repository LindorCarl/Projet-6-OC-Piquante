//Dans le controller les données vont être envoyées à la database.
//Importer le models. 
const User = require("../models/User");

//Importer la variable d'environnement.
const dotenv = require("dotenv");
const result = dotenv.config();

//Importer bcrypt pour hasher le password.
const bcrypt = require("bcrypt");

//Chiffrer l'email avant de l'envoyer dans la BD.
const cryptojs = require("crypto-js");

//Installer puis importer le token.
const jwt = require("jsonwebtoken");

//Fonction signup pour enregistrer un utilisateur dans la database.
exports.signup = (req, res) => {
    const {email, password} = req.body;
    //Chiffrer l'email avant de l'envoyer dans la BD.
    const emailCryptoJs = cryptojs.HmacSHA256(email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    //Hasher le mot de passe.
    bcrypt
    .hash(password, 10) 
    .then((hash) => {
        //Création d'un nouveau schéma avec le mail crypté et le password hashé.
        const user = new User({
            email : emailCryptoJs,
            password : hash
        });
        //Envoie de user dans la database. 
        user
        .save()
        .then(() => 
            res.status(201).json({message : "Utilisateur créé et sauvegardé"})
            )
        .catch((error) => res.status(400).json({error}).send());
    })
    .catch((err) => res.status(500).json({err}).send());
};

//Fonction login pour se connecter.
exports.login = (req, res) => {
    const {email, password} = req.body;
    const emailCryptoJs = cryptojs.HmacSHA256(email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    
    //Chercher l'email dans la database.
    User.findOne({email : emailCryptoJs})
    .then((user) => {
        if(!user){
            return res.status(401).json({error : "Utilisateur inexistant !"})
        }
        //Comparer ensuite les mots de passe. 
        bcrypt
        .compare(password, user.password)
        .then((controlPassword) => {
            //Si le password est différent, échec password.
            if(!controlPassword){
                return res.status(401).json({error : "Mot de passe incorrect !"})
            }
            //Sinon afficher userId et le token.
            res.status(200).json({
                userId : user._id,
                //Le token prend 3 arguments. 
                token : jwt.sign(
                    {userId : user._id},
                    `${process.env.TOKEN}`,
                    {expiresIn : "12h"}
                )
            })
        })
    })
    .catch((err) => res.status(500).json({err}));
};