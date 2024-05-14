const userRouter = require('./user.route')
const authRouter = require('./auth.route')
const publicationRouter = require('./publication.route')
const offerRouter = require('./offer.route')
const sectorRouter = require('./sector.route')
const commentRouter = require('./comment.route')
const chatroomRouter = require('./chatroom.route')
const applicationRouter = require('./application.route')
const notificationRouter = require('./notification.route')
const messageRouter = require('./message.route')
const quizRouter = require('./quiz.route')
const testRouter = require('./test.route')
const openAIRouter = require('./openAI.route')

const routers = [openAIRouter, testRouter, userRouter, authRouter, publicationRouter, sectorRouter, offerRouter, commentRouter, applicationRouter, chatroomRouter, messageRouter, quizRouter, notificationRouter]

module.exports = routers
