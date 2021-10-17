DROP DATABASE IF EXISTS USocial;
CREATE DATABASE USocial;
USE USocial;

CREATE TABLE User(
  userID INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(100) NOT NULL UNIQUE,
  picture VARCHAR(255) NOT NULL,
  password VARCHAR(100) NOT NULL,
  bot BOOLEAN NOT NULL DEFAULT False,
  PRIMARY KEY (userID)
);

CREATE TABLE Friendship(
  friendshipID INT NOT NULL AUTO_INCREMENT,
  accepted BOOLEAN NOT NULL DEFAULT False,
  me INT NOT NULL,
  friend INT NOT NULL,
  PRIMARY KEY (friendshipID),
  FOREIGN KEY (me) REFERENCES User (userID),
  FOREIGN KEY (friend) REFERENCES User (userID)
);

CREATE TABLE Chat(
  chatID INT NOT NULL AUTO_INCREMENT,
  transmitter INT NOT NULL,
  receiver INT NOT NULL,
  PRIMARY KEY (chatID),
  FOREIGN KEY (transmitter) REFERENCES User (userID),
  FOREIGN KEY (receiver) REFERENCES User (userID)
);

CREATE TABLE Message(
  messageID INT NOT NULL AUTO_INCREMENT,
  content VARCHAR(255) NOT NULL,
  currentDate DATE NOT NULL,
  chatID INT NOT NULL,
  PRIMARY KEY (messageID),
  FOREIGN KEY (chatID) REFERENCES Chat (chatID)
);

CREATE TABLE Publication(
  publicationID INT NOT NULL AUTO_INCREMENT,
  content VARCHAR(255) NULL,
  photo VARCHAR(255) NOT NULL,
  userID INT NOT NULL,
  PRIMARY KEY (publicationID),
  FOREIGN KEY (userID) REFERENCES User (userID)
);

CREATE TABLE Hashtag(
  hashtagID INT NOT NULL AUTO_INCREMENT,
  content VARCHAR(255) NOT NULL,
  PRIMARY KEY (hashtagID)
);

CREATE TABLE PublicationTag(
  publicationTagID INT NOT NULL AUTO_INCREMENT,
  publicationID INT NOT NULL,
  hashtagID INT NOT NULL,
  PRIMARY KEY (publicationTagID),
  FOREIGN KEY (publicationID) REFERENCES Publication (publicationID),
  FOREIGN KEY (hashtagID) REFERENCES Hashtag (hashtagID)
);

DROP PROCEDURE IF EXISTS sp_addTagToPost;
DELIMITER $$
CREATE PROCEDURE sp_addTagToPost (
  IN _publicationID INT,
	IN _tag VARCHAR(255)
)
BEGIN
	IF NOT EXISTS (SELECT * FROM Hashtag WHERE content = _tag) THEN
		INSERT INTO Hashtag (content) VALUES (_tag);
	END IF;

  SET @hashtagID = (SELECT hashtagID FROM Hashtag WHERE content = _tag);
  INSERT INTO PublicationTag (publicationID, hashtagID) VALUES ( _publicationID, @hashtagID);
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_acceptFriendRequest;
DELIMITER $$
CREATE PROCEDURE sp_acceptFriendRequest (
  IN _me INT,
  IN _friendshipID INT
)
BEGIN
  UPDATE Friendship SET accepted = '1' WHERE friendshipID = _friendshipID;
  SET @friend = (SELECT me FROM Friendship WHERE friendshipID = _friendshipID);
  INSERT INTO Friendship (me, friend, accepted) VALUES (_me, @friend, '1');
  INSERT INTO Chat (transmitter, receiver) VALUES (_me, @friend);
  INSERT INTO Chat (transmitter, receiver) VALUES (@friend, _me);
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_addMessage;
DELIMITER $$
CREATE PROCEDURE sp_addMessage (
  IN _content VARCHAR(255),
  IN _me INT,
	IN _friend INT
)
BEGIN
  SET @chatID = (SELECT chatID FROM Chat WHERE me = _me AND friend = _friend);
  
  INSERT INTO Message (content, currentDate, chatID) 
    VALUES (_content, CURRENT_DATE(), @chatID);
END$$
DELIMITER ;

-- ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'rootG38';