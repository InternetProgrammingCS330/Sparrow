#======================================================
#=================	  INSTRUCTIONS	 ==================
#======================================================
#=== from within your project directory containing ====
#===== build.sql enter the mysql database as root =====
#============ and run the following script ============
#======================================================
DROP DATABASE IF EXISTS sergeiDB;

DROP USER master;

CREATE USER master IDENTIFIED BY 'qwerty';

GRANT ALL PRIVILEGES ON *.* TO master;
FLUSH PRIVILEGES;

CREATE DATABASE sergeiDB;
USE sergeiDB;

CREATE TABLE ProjectDB (
	projectID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	title VARCHAR(20) NOT NULL,
	description VARCHAR(50) NOT NULL,
	keywords LONGTEXT
	) engine=InnoDB;

CREATE TABLE UserDB (
	email varchar(30) NOT NULL PRIMARY KEY,
	first_name VARCHAR(30)  NOT NULL,
	last_name VARCHAR(30) NOT NULL
	) engine=InnoDB;

CREATE TABLE CommentsDB (
	commentID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	time_stamp DATE NOT NULL,
	projectID INT NOT NULL,
	email varchar(30) NOT NULL,
	comment LONGTEXT NOT NULL,
	FOREIGN KEY (projectID) REFERENCES ProjectDB(projectID),
	FOREIGN KEY (email) REFERENCES UserDB(email)
	) ENGINE=InnoDB;

CREATE TABLE InterestID (
	interestID INT NOT NULL PRIMARY KEY AUTO_INCREMENT 
	) engine=InnoDB;

CREATE TABLE UserInterests (
	email varchar(30) NOT NULL,
	interestID INT NOT NULL,
	UNIQUE INDEX (email,interestID),
	PRIMARY KEY (email, interestID),
	FOREIGN KEY (email) REFERENCES UserDB(email),
	FOREIGN KEY (interestID) REFERENCES InterestID(interestID)
	) engine=InnoDB;

USE sergeiDB;

source populateTables.sql;
