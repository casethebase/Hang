DROP DATABASE IF EXISTS hangdb
CREATE DATABASE hangdb;
USE hangdb;

DROP TABLE IF EXISTS users;
CREATE TABLE users
(
	userID int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    createdAt varchar(20) NOT NULL,
    updatedAt varchar(20) NOT NULL,
	PRIMARY KEY (userID)
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts
(
	id int NOT NULL AUTO_INCREMENT,
    userID int NOT NULL,
    title varchar(100) NOT NULL,
    body varchar(1000) NOT NULL,
	createdAt varchar(20) NOT NULL,
    updatedAt varchar(20) NOT NULL,
    PRIMARY KEY (id)
);