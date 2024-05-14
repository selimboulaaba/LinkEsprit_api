const mongoose = require('mongoose')


const teacherSchema = new mongoose.Schema({
  identifiant:{
    type: String,
    required: true,
    unique: true 
  },
  email: {
    type: String
  }
 
 
}, {
  new: true,
  timestamps: true
})



module.exports = mongoose.model('Teacher', teacherSchema)
