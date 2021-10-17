const cognito = require('../config/cognito');
const rekognition = require('../config/rekognition');
const s3 = require('../config/s3');
const userModel = require('../models/user.model');

const { delay } = require('../utils/shared');
const delayTime = 500;

require('dotenv').config();
const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

const signUp = async (req, res) => {
  if (req.body['password'] !== req.body['confirmPassword']) {
    return response(res, 400, 'The password confirmation does not match');
  }

  req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
    iv,
  }).toString();

  try {
    const { key } = await s3.itemUpload(req.body['nickname'], req.body['item']);
    req.body['picture'] = key;

    const data = await cognito.registerUser(
      req.body['nickname'],
      req.body['password'],
      attributes(req.body)
    );

    if (data[0]) return response(res, 400, data[0]);

    userModel.signUp(req.body, (err, results) => {
      if (err) return response(res, 400, err);
      response(res, 200, results['insertId']);
    });
  } catch (error) {
    response(res, 500, error);
  }
};

const signIn = async (req, res) => {
  req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
    iv,
  }).toString();

  if (req.body['faceID'] === true) {
    userModel.signInFaceID(req.body, (err, results) => {
      if (err) return response(res, 400, err);

      const user = results[0];
      req.body['picture'] = user['picture'];
      req.body['password'] = user['password'];
    });

    await delay(delayTime);
    try {
      const data = await rekognition.compareFaces(
        req.body['item']['base64'],
        req.body['picture']
      );

      const faceMatches = data['FaceMatches'][0];
      if (!faceMatches || faceMatches['Similarity'] < 75) {
        return response(res, 400, 'Not Authorized');
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  const data = await cognito.authenticateUser(
    req.body['nickname'],
    req.body['password']
  );

  if (data[0]) return response(res, 400, 'Not Authorized');

  userModel.get(req.body, (err, results) => {
    if (err) return response(res, 400, err);
    response(res, 200, { ...data[1], ...results[0] });
  });
};

const update = async (req, res) => {
  req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
    iv,
  }).toString();

  try {
    const { key } = await s3.itemUpload(req.body['nickname'], req.body['item']);
    req.body['picture'] = key;

    const data = await cognito.updateUser(
      req.body['nickname'],
      req.body['password'],
      attributes(req.body)
    );
    if (data[0]) return response(res, 400, data[0]);

    userModel.update(req.body, (err, results) => {
      if (err) return response(res, 400, err);
      response(res, 200, results);
    });
  } catch (error) {
    response(res, 500, error);
  }
};

const attributes = (body) => {
  const { email, name, picture, bot } = body;

  return [
    { name: 'email', value: email },
    { name: 'name', value: name },
    { name: 'picture', value: picture },
    { name: 'custom:bot', value: bot.toString() },
  ];
};

const response = (res, code, data) => {
  res.status(code).send({ code, data });
};

module.exports = { signUp, signIn, update };
