-- Active: 1674220021121@@127.0.0.1@3306
-- CRIANDO TABELAS
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

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id)   
);

SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM purchases;

DROP TABLE purchases_products;

--POPULANDO TABELAS
INSERT INTO users (id, email, password)
VALUES
    ("u001", "u001@email.com", "u0010010"), 
    ("u002", "u002@email.com", "u0020020"),
    ("u003", "u003@email.com", "u0030030"); 

INSERT INTO products (id, name, price, category)
VALUES
    ("p001", "Camisa AstroDev", 70, "roupas"),
    ("p002", "Calça Moletom Nike", 90, "roupas"),
    ("p003", "Óculos Geek", 60, "acessorios"),
    ("p004", "Relógio Digital", 290, "eletronicos"),
    ("p005", "Tênis Nike", 240, "sapatos");    

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
    ("pur001", 240, 0, NULL, "u001"),
    ("pur002", 60, 0, NULL, "u001"), 
    ("pur003", 90, 0, NULL, "u002"),
    ("pur004", 240, 0, NULL, "u002"),
    ("pur005", 290, 0, NULL, "u003"),
    ("pur006", 60, 0, NULL, "u003");  

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("pur001", "p001", 2),
    ("pur002", "p003", 1),
    ("pur003", "p005", 1),
    ("pur004", "p002", 1);  

-- GET ALL USERS // REFATORADO PARA ORDEM CRESCENTE NO EMAIL
SELECT * FROM users
ORDER BY email ASC;

-- GET ALL PRODUCTS // REFATORADO PARA ORDEM CRESCENTE DE PRICE E LIMIT 20 COMEÇANDO NO 1º ITEM
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

--GET ALL PURCHASES
SELECT * FROM purchases;

-- GET ALL PRODUCTS 2 II // COM INTERVALO DE PREÇOS EM ORDEM CRESCENTE
SELECT * FROM products
WHERE price >= "50"
AND price <= "150"
ORDER BY price ASC;

--SEARCH PRODUCT BY NAME
SELECT * FROM products
WHERE name = "Camisa AstroDev";

--CREATE USER
INSERT INTO users (id, email, password)
VALUES
    ("u004", "u004@email.com", "u0040040");

--CREATE PRODUCT
INSERT INTO products (id, name, price, category)
VALUES
    ("p006", "Tênis Vans Astronauta", "199", "sapatos");

--GET PRODUCTS BY ID
SELECT * FROM products
WHERE id = "p004";

--DELETE USER BY ID  
DELETE FROM users
WHERE id = "u004";

-- DELETE PRODUCT BY ID    
DELETE FROM products
WHERE id = "p006";

-- EDIT USER BY ID
UPDATE users
SET email = "usuario1@gmail.com"
WHERE id = "u001";

-- EDIT PRODUCT BY ID
UPDATE products
SET price = "119"
WHERE id = "p002";

--UPDATE PEDIDO ENTREGUE
UPDATE purchases
SET delivered_at = datetime('now')
WHERE id = "pur001";

--INNER JOIN users e purchases
SELECT 
users.id AS userId,
users.email,
purchases.*
FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id;

-- INNER JOIN purchases_products, purchases e products
SELECT 
purchases.id AS purchaseID,
products.id AS productId,
products.name AS productName,
purchases_products.quantity,
purchases.buyer_id,
purchases.total_price
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;
