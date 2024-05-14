const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { ROLES } = require('../utils/constants.util')

const userSchema = new mongoose.Schema({
  identifiant:{
    type: String
   
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  isDesactivated: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ROLES
  },
  description: {
    type: String
  },
  telephone: {
    type : String
  },
  // Student, Alumni, Teacher, Admin, SubAdmin
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  birthDate: {
    type: Date
  },
  establishment: {
    type: String
  },

  // Student, Alumni, Teacher, Enterprise
  isVerified: {
    type: Boolean,
    default: false
  },

  // Student, Alumni
  fieldOfStudies: {
    type: String
  },

  // Student
  classroom: {
    type: String
  },

  // Alumni
  graduationDate: {
    type: Date
  },

  // Enterprise
  enterpriseName: {
    type: String
  },
  address: {
    type: String
  },
  industry: {
    type: String
  },
  followersList: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  skills: {
    type: [String],
    default: []
  }
}, {
  new: true,
  timestamps: true
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model('User', userSchema)
