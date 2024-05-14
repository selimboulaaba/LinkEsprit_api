const mongoose = require('mongoose')
const offerSchema = new mongoose.Schema({
  publication: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication' },
  type: {
    type: String,
    required: true
  },
  sector: { type: mongoose.Schema.Types.ObjectId, ref: 'Sector' },
  // registredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startTime: {
    type: Date,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isEnded: {
    type: Boolean,
    default: false
  },
  skills: {
    type: [String],
    default: []
  },
  recommendation: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      isRejected: {
        type: Boolean,
        default: false,
      },
      isApplied: {
        type: Boolean,
        default: false,
      }
    },
  ],
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
}, {
  timestamps: true
})

module.exports = mongoose.model("Offer", offerSchema);
