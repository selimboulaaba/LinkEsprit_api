const express = require('express');
const router = express.Router();
const messageController = require("../controllers/message.controller")


router.get('/messages/:id', messageController.getMessages);




module.exports = router;
