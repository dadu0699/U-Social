DROP DATABASE IF EXISTS USocial;
CREATE DATABASE USocial;
USE USocial;

CREATE TABLE User(
  userID INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(100) NOT NULL UNIQUE,
  picture VARCHAR(100) NOT NULL,
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
    content VARCHAR(255) NOT NULL,
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

-- ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY MYSQL_ROOT_PASSWORD;