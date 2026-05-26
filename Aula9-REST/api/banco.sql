CREATE TABLE produto (

);

INSERT INTO produto (nome, preco )VALUES
("Pepsi", 7.99),
("Coca-Cola", 9.95),
("Trakinas", 3.45) ;

-- Alteraçoes da aula9

CREATE TABLE categoria ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) NOT NULL);

INSERT INTO categoria (nome) VALUES ("Bebidas"), ("Alimentos");

ALTER TABLE produto ADD COLUMN codCategoria INT;

ALTER TABLE produto ADD CONSTRAINT `fk_categoria`
FOREIGN KEY (codCategoria) REFERENCES categoria (id);

UPDATE produto SET codCategoria = 1 where id <= 2;
UPDATE produto SET codCategoria = 2 where id <= 3;