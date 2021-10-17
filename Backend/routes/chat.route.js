const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat.controller');

router
  .route('/')
  .get(chatController.getMessages)
  .post(chatController.sendMessage);

module.exports = router;
