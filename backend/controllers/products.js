//Importer le fichier "Products" de models.
const Products = require("../models/Products");

//Importer le "File System" de node pour gérer des fichiers.
const fs = require("fs");

//Fonction pour créer les produits.
exports.createProducts = (req, res) => {

    const sauceDisplay = JSON.parse(req.body.sauce);
    //Créer un nouveau schéma ( produits parsés et création URL pour l'image).
    const newProducts = new Products({
        ...sauceDisplay,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    });
    //Enregistrer ce nouveau schéma dans la base de données. 
    newProducts
    .save()
    .then(() => {
        res.status(201).json({
            message : "Produit enregistré dans la base de données",
            contenu : req.body
        })
    })
    .catch((err) => res.status(400).json({err}));
};

//Fonction pour afficher TOUS les produits.
exports.getAllProducts = (req, res) => {
    Products.find({})
    .then(products => res.status(200).json(products))
    .catch((err) => res.status(400).json({err}));
};

//Fonction pour afficher UN seul produit.
exports.getOneProduct = (req, res) => {
    //Récupérer l'id du produit selectionné.
    const _id = req.params.id;
    //Récuperer dans le schéma envoyer dans la base de données l'id.
    Products.findById({_id})
    .then((idProduct) => {
        res.status(200).json(idProduct);
    })
    .catch((err) => res.status(400).send({err}));
};

//Fonction pour supprimer un produit.
exports.deleteOneProduct = (req, res) => {
    //Variable pour avoir l'id.
    const _id = req.params.id;
    //Cibler l'id du produit sélectionné pour le supprimer dans la base de données.
    Products.findByIdAndDelete({_id})
    .then((idDeleted) => {
        res.status(200).json({
            message : `${idDeleted} a été supprimé`
        })
        //Supprimer également l'image du produit envoyé en local dans le dossier "images".
        //Dans la response, chercher la key "imageUrl" et récupérer le "filename". 
        const filename = idDeleted.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, (err) => {
            if(err) res.status(500).json({err});
            console.log(`${filename} le fichier a été supprimé`);
        })
    })
    .catch((err) => res.status(400).send({message : err}));
};

//Fonction pour mettre à jour un produit.
exports.updateOneProduct = (req, res) => {
   //Trouver l'id du produit sélectionné.
    Products.findOne({_id : req.params.id})
    .then((object) => {
        //Si un fichier est envoyé, supprime l'ancien fichier.
        if(req.file){
            const filename = object.imageUrl.split("/images")[1];
            fs.unlink(`images/${filename}`, (err) => { 
                if(err) res.status(500).json({err});
                console.log(`${filename} le fichier a été supprimé`);
            });           
        }; 

        //Opérateur ternaire = [condition] ? [if] : [else].
        //Si un fichier est envoyé, envoie le corps de la requête en JSON et la nouvelle image, sinon juste le corps de la requête.
        //Opérateur ...spread pour faire des copies de variables.
        const updateProduct = req.file ? 
            {
                ...JSON.parse(req.body.sauce), 
                imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            } : {
                ...req.body
            }

        //Mettre à jour la base de données. 
        Products
        .updateOne({...updateProduct})
        .then(() => res.status(200).json({
            message : "l'objet a été mis à jour",
            contenu : updateProduct}))
        .catch((error) => res.status(404).json({error}))
            
    })
    .catch((err) => res.status(400).json({err}));
};



        
        