//Importer le Schéma Products de models.
const Products = require("../models/Products"); 

//Fonction pour "liker" les produits. 
exports.likeProducts = (req, res) => {
    //Cibler le produit.
    Products.findOne({_id : req.params.id})
    .then((object) => {
        //Méthode "includes()" pour vérifier si l'id de l'utilisateur est présent dans le tableau "usersLiked".
        //Pour renvoyer la valeur true , utiliser l'opérateur de non logique " ! " pour avoir l'opposé de la fonction.
        if(!object.usersLiked.includes(req.body.userId) && req.body.like === 1){
            Products.updateOne(
                {_id : req.params.id},
                {
                    //L'opérateur $inc pour incrémenter de "1" la key likes.
                    //L’opérateur $push pour ajouter l'id de l'utilisateur au tableau "usersLiked".
                    $inc : {likes : 1}, 
                    $push : {usersLiked : req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Un like a été ajouté"}))
            .catch((err) => res.status(400).json({err}));
        }

        //Like = 0
        if(object.usersLiked.includes(req.body.userId) && req.body.like === 0){
            Products.updateOne(
                //L'opérateur $pull pour effacer l'id de l'utilisateur au tableau "usersLiked".
                //Pour faire passer le like à "0" , la key "likes" doit prendre la valeur de "-1".
                {_id : req.params.id},
                {
                    $inc : {likes : -1},
                    $pull : {usersLiked : req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Le like a été annulé"}))
            .catch((err) => res.status(400).json({err}));
        }

        //Dislike = 1
        if(!object.usersDisliked.includes(req.body.userId) && req.body.like === -1){
            Products.updateOne(
                {_id : req.params.id},
                {
                    $inc : {dislikes : 1},
                    $push : {usersDisliked : req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Un dislike a été ajouté"}))
            .catch((err) => res.status(400).json({err}));
        }
        
        //Dislike = 0
        if(object.usersDisliked.includes(req.body.userId) && req.body.like === 0){
            Products.updateOne(
                {_id : req.params.id},
                {
                    $inc : {dislikes : -1},
                    $pull : {usersDisliked : req.body.userId}
                }
            )
            .then(() => res.status(201).json({message : "Le dislike a été annulé"}))
            .catch((err) => res.status(400).json({err}));
        }
        
    })
    .catch((err) => res.status(404).json({err}));
};