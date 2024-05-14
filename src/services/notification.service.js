const notificationModel = require('../models/notification.model')

exports.list = async (query) => {
  const notifications = await notificationModel.find(query)

  return {
    notifications,
    notificationsNB: notifications.length
  }
}

exports.create = async (body) => {
  const notification = await notificationModel.create(body)

  return notification
}

exports.remove = async (id) => {
  const deletednotification = await notificationModel.findByIdAndDelete(id)
  if (!deletednotification) {
    throw new Error('notification not found')
  }
  return deletednotification
}

exports.markAsRead = async (id) => {
  const updatednotification = await notificationModel.findByIdAndUpdate(
    id,
    { $set: { isRead: true } },
    { new: true }
  )
  return updatednotification
}

exports.findByUrl = async (url) => {
  const notifications = await notificationModel.find({ url })
  return notifications
}
