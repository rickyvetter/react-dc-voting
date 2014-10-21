# items

DROP TABLE IF EXISTS items;
CREATE TABLE items(
  id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY
, name VARCHAR(255)
, description TEXT NOT NULL
, votes INTEGER NOT NULL DEFAULT 0
);
INSERT INTO items(name,description) VALUES ("More Free Food","Hopefully everyone can get behind.");