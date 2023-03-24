//Importation de mongoose.
const mongoose = require("mongoose");

//Importer le plugin "mongoose-unique-validator".
const uniqueValidator = require("mongoose-unique-validator");

//Création du schema mongoose pour enregistrer un nouvel utilisateur. 
const userSchema = mongoose.Schema({
    email : {type : String, required: true, unique: true},
    password : {type: String, required: true}
});

//Securité pour ne pas enregistrer deux fois l'email dans la base de données.
userSchema.plugin(uniqueValidator);
 
//Export du module.
module.exports = mongoose.model("user", userSchema);