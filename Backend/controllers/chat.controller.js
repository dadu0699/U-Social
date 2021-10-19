const chatModel = require('../models/chat.model');

const getChat = (req, res) => {
  chatModel.getChat(req.query, (err, results) => {
    if (err) return response(res, 500, err);
    response(res, 200, results);
  });
};

const sendMessage = (req, res) => {
  chatModel.sendMessage(req.body, (err, results) => {
    if (err) return response(res, 500, err);
    response(res, 200, results);
  });
};

const getMessages = (req, res) => {
  chatModel.getMessages(req.query, (err, results) => {
    if (err) return response(res, 500, err);
    response(res, 200, results);
  });
};

const response = (res, code, data) => {
  res.status(code).send({ code, data });
};

module.exports = { getChat, sendMessage, getMessages };
