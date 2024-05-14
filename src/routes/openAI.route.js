const express = require('express');
const router = express.Router();
const chatController = require('../controllers/openAI.controller');

router.post('/openAI', chatController.handleChatRequest);

module.exports = router;
