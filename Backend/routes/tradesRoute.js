const express = require('express');
const router = express.Router();
const Article = require('../models/article'); 

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Utiliser populate pour récupérer les données de l'utilisateur associées à chaque article
    const articles = await Article.find({ owner: userId }).populate('owner', 'name'); // Vous pouvez personnaliser les champs à récupérer de l'utilisateur

    res.json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
