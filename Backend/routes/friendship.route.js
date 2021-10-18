const express = require('express');
const router = express.Router();

const friendshipController = require('../controllers/friendship.controller');

router
  .route('/')
  .get(friendshipController.suggestions)
  .post(friendshipController.create);

router
  .route('/requests')
  .get(friendshipController.getRequests)
  .post(friendshipController.toAccept)
  .delete(friendshipController.reject);

module.exports = router;
