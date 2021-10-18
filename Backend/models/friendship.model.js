const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const create = (params, callback) => {
  const friendship = [params.userID, params.friendID];

  const query = 'INSERT INTO Friendship (me, friend) VALUES (?, ?)';

  return execute(query, friendship, callback);
};

const suggestions = ({ userID }, callback) => {
  const friendship = [userID, userID, userID];

  const query = `
    SELECT User.userID, nickname, picture
    FROM User
    WHERE User.userID != ?
      AND User.userID NOT IN (
        SELECT friend FROM Friendship
        WHERE me = ?
      ) AND User.userID NOT IN (
        SELECT me FROM Friendship
        WHERE friend = ?
      )
  `;

  return execute(query, friendship, callback);
};

const getRequests = ({ userID }, callback) => {
  const user = [userID];

  const query = `
    SELECT friendshipID, userID, nickname, picture
    FROM User
    INNER JOIN Friendship ON Friendship.me = User.userID
    WHERE Friendship.accepted = 0 AND Friendship.friend = ?
  `;

  return execute(query, user, callback);
};

const toAccept = (params, callback) => {
  const friendship = [params.userID, params.friendshipID];

  const query = 'CALL sp_acceptFriendRequest(?, ?)';

  return execute(query, friendship, callback);
};

const reject = (params, callback) => {
  const friendship = [params.friendshipID];

  const query = 'DELETE FROM Friendship WHERE friendshipID = ?';

  return execute(query, friendship, callback);
};

module.exports = { create, suggestions, getRequests, toAccept, reject };
