const express = require('express')
const cors = require('cors')
const db = require('./src/configs/db')
const routers = require('./src/routes/index')
const cookieParser = require('cookie-parser')
const path = require('path')
const { Server } = require('socket.io')
const { socketfunction } = require('./src/configs/notificationSocket/socketio')
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('/CVs', express.static(path.join(__dirname, 'uploads', 'CVs')))

db()

app.use(cookieParser())
app.use('/api', routers)

/// io socket
const mongoose = require('mongoose')
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
require('./src/models/user.model')
require('./src/models/chatroom.model')
require('./src/models/message.model')

const { verifySecretToken } = require('./src/utils/secretToken.util')
const io = require('socket.io')(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
})

const Message = mongoose.model('Message')
const User = mongoose.model('User')

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token
    const payload = (await verifySecretToken(token)).userId

    socket.userId = payload
    next()
  } catch (err) {}
})

io.on('connection', (socket) => {
  socket.on('disconnect', () => {

  })

  socket.on('joinRoom', ({ chatroomId }) => {
    socket.join(chatroomId)
  })

  socket.on('leaveRoom', ({ chatroomId }) => {
    socket.leave(chatroomId)
  })

  socket.on('chatroomMessage', async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId })

      const newMessage = new Message({
        chatroom: chatroomId,
        user,
        message
      })
      io.to(chatroomId).emit('newMessage', {
        message,
        name: user.firstName,
        user
      })

      await newMessage.save()
    }
  })
})

socketfunction(io)
