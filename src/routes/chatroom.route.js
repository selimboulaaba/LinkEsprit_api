const express = require('express');
const router = express.Router();

const chatroomController = require("../controllers/chatroom.controller");


router.route('/chatroom')
.get(chatroomController.getChatroomById)
.post(chatroomController.createChatroom);
router.get('/chatroom/:id', chatroomController.getChatroomById)


module.exports = router;