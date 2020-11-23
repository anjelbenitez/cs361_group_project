# cs361_group_project
This is the group project repo for Team Pacific Time in CS 361 - Software Engineering I for the Fall 2020 term at Oregon State University.

# Setup
## Requirements
The project is known to work with the following setup.
* Node.js v12.19.0 (run `$ node --version` to check)
* npm 6.14.8 (run `$ npm --version` to check)

## Run the app
1. Run `$ npm install` to install the dependency modules
1. Run `$ node main.js` to start the app
1. Visit http://localhost:3000/ and you should see a page with the message "Hello world!".

## Set up a local Postgres database for testing
1. Install Postgres and start your local Postgres instance.
1. Create a local database called `ethical_eating` by running `$ createdb --encoding=UTF8 -h localhost -p 5432 ethical_eating`.
1. Import the sample SQL data definition file `$ psql -h localhost -d ethical_eating -f /your/path/to/data_definition_postgres.sql`.
1. Visit http://localhost:3000/dbtest and you should see the entries from the test table.
