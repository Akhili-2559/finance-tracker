CREATE DATABASE expense_tracker;

USE expense_tracker;

CREATE TABLE users (

    id INT PRIMARY KEY AUTO_INCREMENT,

    username VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE expenses (

    id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(100) NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    category VARCHAR(50) NOT NULL,

    expense_date DATE NOT NULL,

    description TEXT,

    user_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);