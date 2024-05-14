const user = require('../../models/user.model')
const notificationModel = require('../../models/notification.model')
const offerService = require('../../services/offer.service')
const notificationService = require('../../services/notification.service')
const userService = require('../../services/user.service')
const usersio = []

module.exports.socketfunction = (io) => {
  io.on('connect', (socket) => {
    socket.on('setUserId', async (userId) => {
      if (userId) {
        const oneUser = await user.findById(userId).lean().exec()
        if (oneUser) {
          usersio[userId] = socket
        } else {
        }
      }
    })
    socket.on('getNotificationsLength', async (userId) => {
      let notifications = []
      if (userId) {
        notifications = await notificationModel
          .find({ user: userId, isRead: false })
          .lean()
      }
      usersio[userId]?.emit('notificationsLength', notifications.length || 0)
    })
    socket.on('getNotifications', async (userId) => {
      let notifications = []
      if (userId) {
        notifications = await notificationModel
          .find({ user: userId, isRead: false })
          .lean()
      }
      usersio[userId]?.emit('notifications', notifications || [])
    })
    socket.on('createOffer', async ({ offerId, userId }) => {
      const offer = await offerService.getById(offerId)
      const usersData = await userService.list()
      const filtredUsers = usersData.users.filter(user => user._id.toString() !== userId)
      filtredUsers.map(async user => {
        const notification = {
          user: user._id,
          title: `New Offer by ${offer.companyName}`,
          type: 'NEW_OFFER',
          text: `New offer by ${offer.companyName} `,
          isRead: false,
          link: `offers/${offer._id.toString()}`
        }
        await notificationService.create(notification)
        const userId = user._id.toString()
        const notificationsData = await notificationService.list({ user: userId, isRead: false })
        usersio[userId]?.emit('notificationsLength', notificationsData.notifications.length || 0)
        usersio[userId]?.emit('notifications', notificationsData.notifications || [])
      })
    })
    socket.on('markNotificationAsRead', async ({ notificationId, userId }) => {
      await notificationService.markAsRead(notificationId)
      const notifications = await notificationModel
        .find({ user: userId, isRead: false })
        .lean()
      usersio[userId]?.emit('notifications', notifications || [])
    })
    socket.on('disconnect', (userId) => {
      usersio[userId] = null
    })
  })
}
