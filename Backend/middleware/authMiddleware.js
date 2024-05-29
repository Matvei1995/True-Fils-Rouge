// authMiddleware.js
const jwt = require('jsonwebtoken');

function authentificationMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni.' });
  }

  // Extraire le token après "Bearer "
  const tokenValue = token.split(' ')[1];

  try {
    const decoded = jwt.verify(tokenValue, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expirée. Veuillez vous reconnecter.' });
    } else {
      return res.status(401).json({ message: 'Token invalide.' });
    }
  }
}

module.exports = authentificationMiddleware;
