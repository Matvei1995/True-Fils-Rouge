const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // Stocke le chemin de l'image
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
