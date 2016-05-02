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

CREATE TABLE userDB (
	email varchar(30) NOT NULL PRIMARY KEY,
	first_name VARCHAR(30)  NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	profile_picture VARCHAR(200),
	department_preference LONGTEXT
	) ENGINE=InnoDB;

CREATE TABLE projectDB (
	projectID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	title VARCHAR(20) NOT NULL,
	description LONGTEXT NOT NULL,
	keywords VARCHAR(100),
	email varchar(30) NOT NULL,
	time_stamp DATE NOT NULL,
	FOREIGN KEY (email) REFERENCES userDB(email)
	) ENGINE=InnoDB;

CREATE TABLE commentsDB (
	commentID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	time_stamp DATE NOT NULL,
	projectID INT NOT NULL,
	email varchar(30) NOT NULL,
	comment LONGTEXT NOT NULL,
	FOREIGN KEY (projectID) REFERENCES projectDB(projectID),
	FOREIGN KEY (email) REFERENCES UserDB(email)
	) ENGINE=InnoDB;

CREATE TABLE interestDB (
	email varchar(30) NOT NULL,
	projectID INT NOT NULL,
	UNIQUE INDEX (email,projectID),
	PRIMARY KEY (email, projectID),
	FOREIGN KEY (email) REFERENCES userDB(email),
	FOREIGN KEY (projectID) REFERENCES projectDB(projectID)
	) ENGINE=InnoDB;

CREATE TABLE departmentDB (
	departmentID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	department_name varchar(30)
	) ENGINE=InnoDB;

USE sergeiDB;

source populateTables.sql;
