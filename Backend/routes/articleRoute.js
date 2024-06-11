const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// Stockage en mémoire pour les fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', authMiddleware, upload.array('images'), async (req, res) => {
  try {
    const userId = req.user.id;
    const imageUrls = []; // Tableau pour stocker les URLs des images

    // Parcourir chaque image téléchargée
    for (const file of req.files) {
      // Ici, vous devriez stocker l'image dans un service de stockage (cloud) ou localement
      // et récupérer son URL
      const imageUrl = await storeImageAndGetUrl(file); // Fonction hypothétique
      imageUrls.push(imageUrl);
    }

    const newArticle = new Article({
      ...req.body,
      images: imageUrls,
      owner: userId
    });
    
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
module.exports = router;