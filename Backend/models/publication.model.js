const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const createPublication = (params, callback) => {
  const publication = [params.content, params.photo, params.userID];

  const query = `
    INSERT INTO Publication (content, photo, userID)
    VALUES (?, ?, ?)
  `;

  return execute(query, publication, callback);
};

const publicationTag = (params, callback) => {
  const pubTag = [params.publicationID, params.tag];

  const query = 'CALL sp_addTagToPost(?, ?)';

  return execute(query, pubTag, callback);
};

const getPublications = (params, callback) => {
  const publication = [params.userID, params.userID];

  const query = `
    SELECT * FROM
    ((
      SELECT publicationID, content, photo,
        Publication.userID, nickname, picture
      FROM Friendship
      INNER JOIN Publication ON (
        Friendship.friend = Publication.userID
        OR Friendship.me = Publication.userID)
      INNER JOIN User ON (User.userID = Publication.userID)
      WHERE Friendship.accepted = True AND Friendship.me = ?
    )
    UNION
    (
      SELECT publicationID, content, photo,
        Publication.userID, nickname, picture
      FROM Publication
      INNER JOIN User ON (User.userID = Publication.userID)
      WHERE Publication.userID = ?
    )) Publication
    ORDER BY publicationID DESC
  `;

  return execute(query, publication, callback);
};

const getPublicationTags = (params, callback) => {
  const publication = [params.publicationID];

  const query = `
    SELECT Hashtag.content AS 'tag' FROM PublicationTag
    INNER JOIN Publication ON (Publication.publicationID = PublicationTag.publicationID)
    INNER JOIN Hashtag ON (PublicationTag.HashtagID = Hashtag.HashtagID)
    WHERE Publication.publicationID = ?
  `;

  return execute(query, publication, callback);
};

module.exports = {
  createPublication,
  publicationTag,
  getPublications,
  getPublicationTags,
};
