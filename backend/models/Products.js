//Importer mongoose.
const mongoose = require("mongoose");

//Créér un schéma pour enregistrer les produits dans la database.
const productsSchema = mongoose.Schema({
    userId: {type : String},
    name: {type : String},
    manufacturer: {type : String},
    description: {type : String},
    mainPepper: {type : String},
    imageUrl: {type : String}, 
    heat: {type : Number}, 
    likes: {type : Number},  
    dislikes: {type : Number}, 
    usersLiked: {type : [String]}, 
    usersDisliked: {type : [String]} 
},
    //Pour afficher la date de création ou de modification.
{
    timestamps : true
});

//Exporter le module ("clé", valeur).
module.exports = mongoose.model("products", productsSchema);