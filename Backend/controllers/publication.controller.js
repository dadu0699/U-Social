const s3 = require('../config/s3');
const rekognition = require('../config/rekognition');
const publicationModel = require('../models/publication.model');

require('dotenv').config();
const { LAMBDA_TRANSLATE } = process.env;

const create = async (req, res) => {
  try {
    const { key } = await s3.itemUpload(req.body['nickname'], req.body['item']);
    req.body['photo'] = key;

    const { Labels } = await rekognition.detectLabels(
      req.body['item']['base64']
    );

    publicationModel.createPublication(req.body, (err, results) => {
      if (err) return response(res, 500, err);

      const publicationID = results['insertId'];
      Labels.forEach((label) => {
        publicationModel.publicationTag(
          { publicationID, tag: label['Name'] },
          () => {}
        );
      });

      response(res, 200, publicationID);
    });
  } catch (error) {
    response(res, 500, error);
  }
};

const getPublications = (req, res) => {
  publicationModel.getPublications(req.query, (err, results) => {
    if (err) return response(res, 500, err);
    response(res, 200, results);
  });
};

/*global fetch*/
const translate = async (req, res) => {
  const url = new URL(LAMBDA_TRANSLATE);
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: req.body['content'] }),
  };

  try {
    const fetchResponse = await fetch(url, settings);
    const data = await fetchResponse.json();
    response(res, 200, data);
  } catch (error) {
    response(res, 500, error);
  }
};

const response = (res, code, data) => {
  res.status(code).send({ code, data });
};

module.exports = { create, getPublications, translate };
