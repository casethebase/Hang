DROP DATABASE IF EXISTS hangDB;
CREATE DATABASE hangDB;

USE hangDB;

INSERT INTO Users (name, email, username, password)
VALUES ('Rick Astley', 'nevergonna@giveyouup.com', 'dickastley', 'rickroll');

INSERT INTO Users (name, email, username, password)
VALUES ('Agent Jay', 'jay@meninblack.com', 'meninblackjay', 'agentklovesme');

INSERT INTO Users (name, email, username, password)
VALUES ('Snoop Dogg', 'snoopdogg@twitch.com', 'dropitlikeitshot', 'whatwhat');

INSERT INTO Users (name, email, username, password)
VALUES ('Frodo Baggins', 'theone@ring.com', 'hobbitlover227', 'frodotheone');

INSERT INTO Users (name, email, username, password)
VALUES ('Wilfred', 'whatssanity@me.com', 'wilfred', 'amireal');


INSERT INTO Hangs (hangName, aboutHang, hangDate, hangTime, members, pending_member, notification)
VALUES ('Swimming at Barton', 'Were swimming at Barton', '2018-07-29', '04:00PM', 'casey@casey.com');
