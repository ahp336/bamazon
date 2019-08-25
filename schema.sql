DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products (
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
department VARCHAR(50) NOT NULL,
price DECIMAL(5,3) NOT NULL,
inventory INT NOT NULL
);

