-- Active: 1674220021121@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL  
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL, 
    category TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
    ("u001", "u001@email.com", "u0010010"), 
    ("u002", "u002@email.com", "u0020020"),
    ("u003", "u003@email.com", "u0030030"); 

INSERT INTO products (id, name, price, category)
VALUES
    ("p001", "Camisa AstroDev", "70", "roupas"),
    ("p002", "Calça Moletom Nike", "90", "roupas"),
    ("p003", "Óculos Geek", "60", "acessorios"),
    ("p004", "Relógio Digital", "290", "eletronicos"),
    ("p005", "Tênis Nike", "240", "sapatos");    

SELECT * FROM users;

SELECT * FROM products;