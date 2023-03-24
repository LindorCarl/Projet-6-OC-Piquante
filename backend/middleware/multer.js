//Importer multer pour des requêtes http avec envoie de fichiers.
const multer = require("multer");

//Indiquer la nature et le format de l'image.
const MIME_TYPES = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/gif" : "gif",
    "image/gif" : "png"
};

//Déclarer la destination de stockage du fichier, code npm.
const storage = multer.diskStorage({
    //Stockage dans le dossier "images".
    destination: (req, file, callback) => {
      callback(null, "images");
    },
    filename: (req, file, callback) => {
        //supprimer les espaces dans le nom du fichier sinon joindre un _ à la place.
      const name = file.originalname.split(" ").join("_");
        //Mettre le mimetype.
      const extension = MIME_TYPES[file.mimetype]
      callback(null, `${name}_${Date.now()}.${extension}`);
    }
})

const upload = multer({ storage: storage })

//Exporter le middleware multer : .single pour n'envoyer qu'un seul fichier.
module.exports = multer({storage}).single("image");