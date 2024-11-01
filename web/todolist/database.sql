CREATE DATABASE TodoList;

USE TodoList;

CREATE TABLE Task (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM('pending', 'running', 'completed') DEFAULT 'pending',
  limit_date DATE NOT NULL
);