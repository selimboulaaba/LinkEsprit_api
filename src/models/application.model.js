const mongoose = require("mongoose");
const { OFFRE_STATE } = require("../utils/constants.util");

const applicationSchema = new mongoose.Schema({
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',  // Name of the referenced model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Name of the referenced model
    required: true,
  },
  pdfFile: {
    type: String
  },
  fileName: {
    type: String
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    default: null
  },
  state: {
    type: String,
    enum: OFFRE_STATE
  },
  compatibility: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);
