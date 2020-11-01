DROP TABLE IF EXISTS test_table;

-- First drop tables that depend on the other tables
DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS ingredient_ethical_problem;
DROP TABLE IF EXISTS ingredient_alternative;

-- Then drop tables that are depended on
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS recipe;
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
    ('tomato'),             -- 1
    ('chicken broth'),      -- 2
    ('garlic'),             -- 3
    ('thyme'),              -- 4
    ('rosemary'),           -- 5
    ('black pepper'),       -- 6
    ('olive oil'),          -- 7
    ('pine nut'),           -- 8
    ('basil'),              -- 9
    ('avocado'),            -- 10
    ('onion'),              -- 11
    ('heavy cream'),        -- 12
    ('cashew cream'),       -- 13
    ('soy milk');           -- 14


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
    ('Tomato Soup', NULL, TRUE),
    ('Pesto', NULL, TRUE),
    ('Guacamole', NULL, TRUE);


CREATE TABLE recipe_ingredient (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES
    -- Tomato Soup
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 13), -- heavy cream
    -- Pesto
    (2, 3),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    -- Guacamole
    (3, 10), -- Avocado
    (3, 1), -- Tomato
    (3, 3), -- Garlic
    (3, 11); -- Onion

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
    (10, 1), -- Avocado and deforestation
    (12, 2); -- Heavy cream and carbon emission

create table ingredient_alternative (
    ingredient_id INT,
    alternative_id INT,
    PRIMARY KEY (ingredient_id, alternative_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (alternative_id) REFERENCES ingredient (id) ON UPDATE CASCADE ON DELETE CASCADE
);

insert into ingredient_alternative (ingredient_id, alternative_id) values
    (12, 13), -- Heavy cream and cashew cream
    (12, 14); -- Heavy cream and soy milk