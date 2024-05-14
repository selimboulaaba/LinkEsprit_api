const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notification.controller')

router
  .route('/notifications')
  .get(notificationController.list)
  .post(notificationController.create)

router
  .route('/notifications:id')
  .delete(notificationController.remove)
  .patch(notificationController.markAsRead)

module.exports = router
