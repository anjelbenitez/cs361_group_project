DROP TABLE IF EXISTS test_table;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS recipe_ingredient;

CREATE TABLE test_table (
    id SERIAL PRIMARY KEY NOT NULL,
    title text
);

INSERT INTO test_table (title) VALUES
	('Random Title 1'),
	('Random Title 2');

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY NOT NULL,
    name text
);

INSERT INTO ingredient (name) VALUES
    ('tomato'),
    ('chicken broth'),
    ('garlic'),
    ('thyme'),
    ('rosemary'),
    ('black pepper'),
    ('olive oil'),
    ('pine nut'),
    ('basil');

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY NOT NULL,
    name text
);

INSERT INTO recipe (name) VALUES
    ('Tomato Soup'),
    ('Pesto');

CREATE TABLE recipe_ingredient (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 3),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9);
