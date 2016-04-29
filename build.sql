#======================================================
#=================	  INSTRUCTIONS	 ==================
#======================================================
#=== from within your project directory containing ====
#===== build.sql enter the mysql database as root =====
#============ and run the following script ============
#======================================================
DROP DATABASE sergeiDB;

DROP USER master;

CREATE USER master IDENTIFIED BY 'qwerty';
GRANT ALL PRIVILEGES ON *.* TO master;
FLUSH PRIVILEGES;

CREATE DATABASE sergeiDB;
USE sergeiDB;

CREATE TABLE ProjectDB (projectID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
title VARCHAR(20) NOT NULL,
description VARCHAR(50) NOT NULL,
interests VARCHAR(20) NOT NULL
engine=InnoDB;

CREATE TABLE UserDB (email varchar(30) NOT NULL PRIMARY KEY,
first_name VARCHAR(15),
last_name INT NOT NULL DEFAULT 5,
password VARCHAR(128) NOT NULL,
locationID INT NOT NULL,
first_name VARCHAR(20) NOT NULL, 
last_name VARCHAR(30) NOT NULL,
email VARCHAR(50),
superPrivilege BOOL NOT NULL DEFAULT false,
FOREIGN KEY (locationID) REFERENCES LocationLF(locationID))
engine=InnoDB;

CREATE TABLE CommentsDB (itemID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
time_stamp DATE NOT NULL,
title VARCHAR(50) NOT NULL,
imageID INT,
locationID INT NOT NULL, 
accepted_by VARCHAR(30) NOT NULL, 
claimed_by VARCHAR(30),
claimed BOOL NOT NULL DEFAULT false,
imagePrimColor VARCHAR(20),
imageSecColor VARCHAR(20),
imageThirdColor VARCHAR(20),
itemColor VARCHAR(10),
FULLTEXT (title),
FULLTEXT (imagePrimColor,itemColor),
FOREIGN KEY (locationID) REFERENCES LocationLF(locationID),
FOREIGN KEY (accepted_by) REFERENCES AdminLF(norsekeyID))
ENGINE=MyISAM;

CREATE TABLE InterestID (tag VARCHAR(15) NOT NULL PRIMARY KEY) 
engine=MyISAM;

CREATE TABLE UserInterests (
	itemID INT NOT NULL,
	tags LONGTEXT,
	FOREIGN KEY (itemID) REFERENCES ItemLF (itemID), 
	PRIMARY KEY (itemID),
	FULLTEXT (tags)
	)
engine=MyISAM;

USE sergeiDB;

source populateTables.sql;

source functions.sql;
