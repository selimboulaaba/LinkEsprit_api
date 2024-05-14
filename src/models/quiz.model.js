const mongoose = require('mongoose')


const quizSchema = new mongoose.Schema({
   createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Name of the referenced model
    required: true,
    },
    name:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        },
    quiz: [
        {question: {
            type: String,
            required: true,
            },
        answers: [{
            type: String,
            required: true,  
          }],
    
        correctAnswer: {
            type: Number,
            required: true,
          }}
    ],
    quizDate: {
        type: Date,
        default:Date.now,
    }




 
 
}, {
 
  timestamps: true
})



module.exports = mongoose.model('Quiz', quizSchema)
