const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const sendMessage = (params, callback) => {
  const message = [params.content, params.userID, params.friendID];

  const query = 'CALL sp_addMessage(?, ?, ?)';

  return execute(query, message, callback);
};

const getMessages = ({ userID, friendID }, callback) => {
  const users = [userID, friendID, friendID, userID];

  const query = `
      SELECT Chat.chatID, content, currentDate,
      transmitter, receiver
    FROM Message
    INNER JOIN Chat ON (Message.chatID = Chat.chatID)
    WHERE (Chat.transmitter = ? AND Chat.receiver = ?)
      OR (Chat.transmitter = ? AND Chat.receiver = ?)
    ORDER BY messageID ASC
  `;

  return execute(query, users, callback);
};

module.exports = { sendMessage, getMessages };
