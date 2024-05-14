const userModel = require('../models/user.model')
const { createSecretToken, verifySecretToken } = require('../utils/secretToken.util')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/email/sendEmail.util')
require('dotenv').config()

exports.requestPasswordReset = async (email) => {
  const existingUser = await userModel.findOne({ email })
  if (!existingUser) throw new Error('User does not exist')
  const token = createSecretToken(existingUser._id)
  const link = `localhost:5173/passwordReset?id=${existingUser._id}&token=${token}`
  try {
    sendEmail(
      email,
      'Password Reset Request',
      { name: existingUser.name, link },
      './template/requestResetPassword.handlebars'
    )
  } catch (error) {
    return { success: false, error: error.message }
  }
  return link
}

exports.resetPassword = async (userId, password, token) => {
  const decoded = verifySecretToken(token)
  try {
    if (!(await decoded).status) {
      throw new Error('Invalid token')
    }
    password = await bcrypt.hash(password, 12)
    await userModel.updateOne(
      { _id: userId },
      { $set: { password } },
      { new: true }
    )
    return { success: true }
  } catch (error) {
    console.error('Password reset error:', error)
    return { success: false, error: error.message }
  }
}

exports.signup = async (newUser) => {
  const existingUser = await userModel.findOne({ email: newUser.email })
  if (existingUser) {
    throw new Error('Email already used')
  }
  const user = await userModel.create(newUser)
  return {
    user
  }
}

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error('All fields are required')
  }
  const user = await userModel.findOne({ email })
  if (!user) {
    throw new Error('Incorrect email')
  }
  const auth = await bcrypt.compare(password, user.password)
  if (!auth) {
    throw new Error('Incorrect password')
  }
  if (user.isDesactivated) {
    throw new Error('User is Banned')
  }
  if (!user.isVerified) {
    throw new Error('Wait for Verification')
  }
  const token = createSecretToken(user._id, user.role)
  return token
}

exports.exceptLogin = async (user) => {

}
