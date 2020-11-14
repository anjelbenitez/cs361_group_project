const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const pg = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/ethical_eating",
    // ssl: {
    //   rejectUnauthorized: false
    // }
});
pg.connect()

function initialize(passport) {
    const authenticateLogin = (username, password, done) => {
        let query = `SELECT * FROM account WHERE username = '${username}'`;
        pg.query(query, (err, result) => {
            if(err){
              throw err;
            }
            if (result.rows.length > 0) { // if an account is found
                const user = result.rows[0];
                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) {
                        throw err;
                    }
                    if (match) {
                        return done(null, user);
                    } else {
                        // password does not match user name
                        return done(null, false, {message: "Password is incorrect"});
                    }
                });
            } else { // the username does not exist
                return done(null, false, {message: "Invalid Username"});
            }
        })
    }

    passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password"},
    authenticateLogin
    ));

    passport.serializeUser((user, done) => done(null, user.id)); //store user.id in session

    passport.deserializeUser((id, done) => {   // uses id to obtain user details
        let query = `SELECT * FROM account WHERE id = ${id}`;
        pg.query(query, (err,result) => {
            if (err) {
                throw err;
            } else {
                return done(null, result.rows[0]);
            }
        });
    });
}

module.exports = initialize;