const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/user'); 
require('dotenv').config(); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route d'inscription
router.post('/register', upload.single('profileImage'), async (req, res) => {
  const { name, email, password, city } = req.body;
  const profileImage = req.file ? req.file.path : null;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    user = new User({
      name,
      email,
      city,
      password,
      profileImage
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //{ expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ alert: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, ); 
    //par sécurité il faut que le token a une expiration mais dans notre cas on ne va pas en mettre pour un question de facilité{ expiresIn: '72h' }
    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        city: user.city,
        email: user.email,
        profileImage: user.profileImage,
        token: token
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Erreur du serveur' });
  }
});
const authenticateToken = require('../middleware/authMiddleware');


// Route pour récupérer le profil de l'utilisateur par ID
router.get('/profile/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send({ message: 'Erreur du serveur' });
  }
});



module.exports = router;
