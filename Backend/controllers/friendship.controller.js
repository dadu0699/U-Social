const friendshipModel = require('../models/friendship.model');

const create = (req, res) => {
  friendshipModel.create(req.body, (err, results) => {
    if (err) return response(res, 500, err);
    response(res, 200, results['insertId']);
  });
};

const suggestions = (req, res) => {
  friendshipModel.suggestions(req.query, (err, results) => {
    if (err) return response(res, 500, err);
    response(res, 200, results);
  });
};

const toAccept = (req, res) => {
  friendshipModel.toAccept(req.body, (err, results) => {
    if (err) return response(res, 500, err);
    response(res, 200, results);
  });
};

const response = (res, code, data) => {
  res.status(code).send({ code, data });
};

module.exports = { create, suggestions, toAccept };
