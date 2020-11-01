DROP TABLE IF EXISTS test_table;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS recipe_category;
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
    ('All-Purpose Flour'),      --1
    ('Spaghetti Pasta'),        --2
    ('Egg Noodles'),            --3
    ('Flour Tortilla'),         --4
    ('Burger Buns'),            --5
    ('Sirloin Steak'),          --6
    ('Beef Patty'),             --7
    ('Pork'),                   --8
    ('Ham'),                    --9
    ('Bacon'),                  --10
    ('Russet Potato'),          --11
    ('Avocado'),                --12
    ('Mushroom'),               --13
    ('Tomato'),                 --14
    ('Lettuce'),                --15
    ('Garlic'),                 --16
    ('Parsley'),                --17
    ('Egg'),                    --18
    ('Butter'),                 --19
    ('Milk'),                   --20
    ('Cheddar Cheese'),         --21
    ('Parmesan Cheese'),        --22
    ('Sour Cream'),             --23
    ('Olive Oil'),              --24
    ('Barbeque Sauce'),         --25
    ('Salt'),                   --26
    ('Black Pepper'),           --27
    ('Sugar');                  --28

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY NOT NULL,
    name text
);

INSERT INTO recipe (name) VALUES
    ('Ham and Cheese Omelette'),
    ('Breakfast Burrito'),
    ('Cheeseburger'),
    ('Pulled Pork Sandwich'),
    ('Beef Stroganoff'),
    ('Carbonara');

CREATE TABLE category (
    id SERIAL PRIMARY KEY NOT NULL,
    name text
);

INSERT INTO category (name) VALUES
    ('Breakfast'),
    ('Lunch'),
    ('Dinner');

CREATE TABLE recipe_category (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO recipe_category (recipe_id, category_id) VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 2),
    (5, 3),
    (6, 3);

CREATE TABLE recipe_ingredient (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES
    (1, 9),
    (1, 17),
    (1, 18),
    (1, 19),
    (1, 20),
    (1, 21),
    (1, 26),
    (1, 27),
    (2, 4),
    (2, 10),
    (2, 11),
    (2, 12),
    (2, 18),
    (2, 21),
    (3, 5),
    (3, 7),
    (3, 14),
    (3, 15),
    (3, 21),
    (4, 5),
    (4, 8),
    (4, 25),
    (4, 26),
    (4, 28),
    (5, 1),
    (5, 3),
    (5, 6),
    (5, 13),
    (5, 16),
    (5, 19),
    (5, 23),
    (5, 26),
    (5, 27),
    (6, 2),
    (6, 10),
    (6, 16),
    (6, 17),
    (6, 18),
    (6, 22),
    (6, 24),
    (6, 26),
    (6, 27);
    
