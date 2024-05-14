const notificationService = require('../services/notification.service')

async function list (req, res, next) {
  try {
    const notifications = await notificationService.list()
    res.json(notifications)
  } catch (err) {
    console.error('Error while getting notifications', err.message)
    next(err)
  }
}

async function create (req, res, next) {
  try {
    const notificationData = req.body
    const notification = await notificationService.create(notificationData)
    res.json(notification)
  } catch (err) {
    console.error('Error while creating notification', err.message)
    next(err)
  }
}

async function remove (req, res, next) {
  try {
    const id = req.params.id
    const deletedNotification = await notificationService.remove(id)
    res.json(deletedNotification)
  } catch (err) {
    console.error('Error while deleting notification', err.message)
    next(err)
  }
}

async function markAsRead (req, res, next) {
  try {
    const id = req.params.id
    const updatedNotification = await notificationService.markAsRead(id)
    res.json(updatedNotification)
  } catch (err) {
    console.error('Error while marking notification as read', err.message)
    next(err)
  }
}

async function findByUrl (req, res, next) {
  try {
    const url = req.params.url
    const notifications = await notificationService.findByUrl(url)
    res.json(notifications)
  } catch (err) {
    console.error('Error while finding notifications by URL', err.message)
    next(err)
  }
}

module.exports = {
  list,
  create,
  remove,
  markAsRead,
  findByUrl
}
