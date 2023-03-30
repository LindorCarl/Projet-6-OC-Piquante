//Importer mongoose.
const mongoose = require("mongoose");

//Créér un schéma pour enregistrer les produits dans la database.
const productsSchema = mongoose.Schema({
    userId: {type : String, required: true},
    name: {type : String, required: true},
    manufacturer: {type : String, required: true},
    description: {type : String, required: true},
    mainPepper: {type : String, required: true},
    imageUrl: {type : String, required: true}, 
    heat: {type : Number, required: true}, 
    likes: {type : Number, default: 0},  
    dislikes: {type : Number, default: 0}, 
    usersLiked: {type : [String]}, 
    usersDisliked: {type : [String]} 
},
    //Pour afficher la date de création ou de modification.
{
    timestamps : true
});

//Exporter le module ("clé", valeur).
module.exports = mongoose.model("products", productsSchema);