const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const create = (params, callback) => {
  const friendship = [params.userID, params.friendID];

  const query = 'INSERT INTO Friendship (me, friend) VALUES (?, ?)';

  return execute(query, friendship, callback);
};

const suggestions = (params, callback) => {
  const friendship = [params.userID, params.userID];

  const query = `
    SELECT User.userID, nickname, picture
    FROM User
    WHERE User.userID != ?
      AND User.userID NOT IN (
        SELECT friend FROM Friendship
        WHERE me = ?
      )
    GROUP BY User.userID;
  `;

  return execute(query, friendship, callback);
};

const toAccept = (params, callback) => {
  const friendship = [params.userID, params.friendshipID];

  const query = 'CALL sp_acceptFriendRequest(?, ?)';

  return execute(query, friendship, callback);
};

module.exports = { create, suggestions, toAccept };
