const express = require('express');
const router = express.Router();

const friendshipController = require('../controllers/friendship.controller');

router
  .route('/')
  .get(friendshipController.suggestions)
  .post(friendshipController.create);

router.route('/to-accept').post(friendshipController.toAccept);

module.exports = router;
