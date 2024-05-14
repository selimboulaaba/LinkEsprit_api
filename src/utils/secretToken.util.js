require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

module.exports.createSecretToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60
  })
}

module.exports.verifySecretToken = async (token) => {
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY)
    const user = await userModel.findById(data.userId)
    if (user) {
      return { role: user.role,userId: user._id, status: true }
    } else {
      return { status: false }
    }
  } catch (error) {
    return { status: false }
  }
}
