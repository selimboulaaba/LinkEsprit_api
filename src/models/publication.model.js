const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  likes: {
    type: Number,
    
  },
  likes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Name of the referenced model
      required: true
    }
  }],
  description: {
    type: String,
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',  // Name of the referenced model
  }],
 publicationDate: {
    type: Date,
    default:Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  // Name of the referenced model
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Publication', publicationSchema);