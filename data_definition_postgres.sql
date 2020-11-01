DROP TABLE IF EXISTS test_table;

-- First drop tables that depend on the other tables
DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS recipe_category;
DROP TABLE IF EXISTS ingredient_ethical_problem;
DROP TABLE IF EXISTS ingredient_alternative;

-- Then drop tables that are depended on
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS recipe_category;
DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS ethical_problem;
DROP TABLE IF EXISTS "user";

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
    ('Sugar'),                  --28
    ('Heavy Cream'),            --29
    ('Cashew Cream'),           --30
    ('Soy Milk');               --31

-- Note that user is a reserved word in Postgres, so we need to surround it with quotes
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name text,
    last_name text
);

INSERT INTO "user" (first_name, last_name) VALUES
    ('John', 'Doe');

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY NOT NULL,
    name text,
    owner_id int,
    public boolean not null,
    FOREIGN KEY (owner_id) REFERENCES "user" (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO recipe (name, owner_id, public) VALUES
    ('Ham and Cheese Omelette', NULL, TRUE),  -- 1
    ('Breakfast Burrito', NULL, TRUE),        -- 2
    ('Cheeseburger', NULL, TRUE),             -- 3
    ('Pulled Pork Sandwich', NULL, TRUE),     -- 4
    ('Beef Stroganoff', NULL, TRUE),          -- 5
    ('Carbonara', NULL, TRUE);                -- 6

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
    -- Ham and Cheese Omelette
    (1, 9),
    (1, 17),
    (1, 18),
    (1, 19),
    (1, 20),
    (1, 21),
    (1, 26),
    (1, 27),
    -- Breakfast Burrito
    (2, 4),
    (2, 10),
    (2, 11),
    (2, 12),
    (2, 18),
    (2, 21),
    -- Cheeseburger
    (3, 5),
    (3, 7),
    (3, 14),
    (3, 15),
    (3, 21),
    -- Pulled Pork Sandwich
    (4, 5),
    (4, 8),
    (4, 25),
    (4, 26),
    (4, 28),
    -- Beef Stroganoff
    (5, 1),
    (5, 3),
    (5, 6),
    (5, 13),
    (5, 16),
    (5, 19),
    (5, 23),
    (5, 26),
    (5, 27),
    -- Carbonara
    (6, 2),
    (6, 10),
    (6, 16),
    (6, 17),
    (6, 18),
    (6, 22),
    (6, 24),
    (6, 26),
    (6, 27);

create table ethical_problem (
    id SERIAL PRIMARY KEY NOT NULL,
    title text
);

insert into ethical_problem (title) values
    ('deforestation'),
    ('carbon emission');

create table ingredient_ethical_problem (
    ingredient_id INT,
    problem_id INT,
    PRIMARY KEY (ingredient_id, problem_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (problem_id) REFERENCES ethical_problem (id) ON UPDATE CASCADE ON DELETE CASCADE
);

insert into ingredient_ethical_problem values
    (12, 1), -- Avocado and deforestation
    (29, 2); -- Heavy cream and carbon emission

create table ingredient_alternative (
    ingredient_id INT,
    alternative_id INT,
    PRIMARY KEY (ingredient_id, alternative_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (alternative_id) REFERENCES ingredient (id) ON UPDATE CASCADE ON DELETE CASCADE
);

insert into ingredient_alternative (ingredient_id, alternative_id) values
    (29, 30), -- Heavy cream and cashew cream
    (29, 31); -- Heavy cream and soy milk
