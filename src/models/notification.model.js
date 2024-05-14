const mongoose = require('mongoose')
const { NOTIFICATION_TYPES } = require('../utils/constants.util')

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, require: true },
    title: { type: String, require: true },
    type: { type: String, required: true, enum: NOTIFICATION_TYPES },
    text: { type: String, require: true },
    isRead: { type: Boolean, default: false },
    link: { type: String, require: true }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('notification', notificationSchema)
