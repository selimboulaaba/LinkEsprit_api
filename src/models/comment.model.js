const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  likes: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    required: true,
  },
 commentDate: {
    type: Date,
    default:Date.now,
  },
  publicationId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Publication',  // Name of the referenced model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  // Name of the referenced model
    required: true,
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' // Reference to the parent comment
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' // Reference to the reply comments
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
