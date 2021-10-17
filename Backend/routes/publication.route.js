const express = require('express');
const router = express.Router();

const publicationController = require('../controllers/publication.controller');

router
  .route('/')
  .get(publicationController.getPublications)
  .post(publicationController.create);

router.route('/translate').post(publicationController.translate);

router.route('/tags').get(publicationController.getTags);

module.exports = router;
