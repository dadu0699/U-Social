const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const signUp = (params, callback) => {
  const user = [params.nickname, params.picture, params.password];

  const query = `
    INSERT INTO User(nickname, picture, password)
    VALUES(?, ?, ?)
  `;

  return execute(query, user, callback);
};

const signInFaceID = (params, callback) => {
  const user = [params.nickname];

  const query = `
    SELECT picture, password FROM User Where nickname = ?
  `;

  return execute(query, user, callback);
};

const get = (params, callback) => {
  const user = [params.nickname, params.password];

  const query = `
    SELECT userID FROM User Where nickname = ? AND password = ?
  `;

  return execute(query, user, callback);
};

const update = (params, callback) => {
  const user = [params.picture, params.nickname];

  const query = `
    UPDATE User SET picture = ? WHERE nickname = ?
  `;

  return execute(query, user, callback);
};

module.exports = { signUp, signInFaceID, get, update };
