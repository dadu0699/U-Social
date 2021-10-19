const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat.controller');

router
  .route('/')
  .get(chatController.getMessages)
  .post(chatController.sendMessage);

router.route('/all').get(chatController.getChat);

module.exports = router;
