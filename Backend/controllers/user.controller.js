const cognito = require('../config/cognito');
const s3 = require('../config/s3');

require('dotenv').config();
const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

const signUp = async (req, res) => {
  if (req.body['password'] !== req.body['confirmPassword']) {
    return response(res, 400, 'The password confirmation does not match');
  }

  const password = CryptoJS.AES.encrypt(req.body['password'], key, {
    iv,
  }).toString();

  try {
    const { key } = await s3.itemUpload(req.body['nickname'], req.body['item']);
    req.body['picture'] = key;

    const data = await cognito.registerUser(
      req.body['nickname'],
      password,
      attributes(req.body)
    );

    if (data[0]) return response(res, 500, data[0]);
    return response(res, 200, data[1]);
  } catch (error) {
    return response(res, 500, error);
  }
};

const signIn = async (req, res) => {
  if (req.body['faceID'] === true) {
    return response(res, 200, 'faceID');
  }

  const password = CryptoJS.AES.encrypt(req.body['password'], key, {
    iv,
  }).toString();

  const data = await cognito.authenticateUser(req.body['nickname'], password);

  if (data[0]) return response(res, 500, data[0]);
  return response(res, 200, data[1]);
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

module.exports = { signUp, signIn };
