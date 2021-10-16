const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const signUp = async (params, callback) => {
  const user = [
    params.nickname,
    params.email,
    params.password,
    params.photo.thumbnail,
  ];

  const query = `
  INSERT INTO User(nickname, email, password, photo)
  VALUES(?, ?, ?, ?)
`;

  return execute(query, user, callback);
};

module.exports = { signUp };
