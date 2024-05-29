const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  giver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'], // enum permet États avez des catégories prédéfinies possibles du troc
    default: 'pending',
  },

});

module.exports = mongoose.model('Trade', tradeSchema);
