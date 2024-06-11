const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 

const db = process.env.MONGODB_URI;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Importer les routes
const userRoutes = require('./routes/routeUser');
const articleRoutes = require('./routes/articleRoute');
const tradesRoute = require('./routes/tradesRoute');

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/trade', tradesRoute);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
