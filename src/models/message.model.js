const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom is required!",
    ref: "Chatroom",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom is required!",
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  messageDate: {
    type: Date,
    default:Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
