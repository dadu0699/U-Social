const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.route('/sign-up').post(userController.signUp);
router.route('/sign-in').post(userController.signIn);

module.exports = router;
