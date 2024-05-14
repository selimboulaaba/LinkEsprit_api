const mongoose = require('mongoose')

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Sector', sectorSchema)
