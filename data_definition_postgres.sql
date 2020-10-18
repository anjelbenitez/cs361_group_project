DROP TABLE IF EXISTS test_table;

CREATE TABLE test_table (
    id SERIAL PRIMARY KEY NOT NULL,
    title text
);

INSERT INTO test_table (title) VALUES
	('Random Title 1'),
	('Random Title 2');