const mongoose = require('mongoose')


const testSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Name of the referenced model
    required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',  // Name of the referenced model
        required: true,
    
    },
    score: {
        type: Number,
        required: true,
    },




 
 
}, {
 
  timestamps: true
})



module.exports = mongoose.model('Test', testSchema)
