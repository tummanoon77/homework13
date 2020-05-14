DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
	id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(250) NOT NULL,
    devoured BOOLEAN DEFAULT false
);
