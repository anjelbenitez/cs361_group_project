var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
const bcrypt = require('bcrypt');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

// Connect with Postgres
const { Client } = require('pg');
const e = require('express');
const pg = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/ethical_eating",
    // ssl: {
    //   rejectUnauthorized: false
    // }
});
pg.connect();

app.get('/',function(req,res,next){
    let context = {};
    context.title = "Home";
    res.render('home', context);
});

app.get('/build',function(req,res,next){
  let context = {};
  context.title = "Build a Recipe";
  res.render('build', context);
});

/*
display recipes for breakfast
*/
app.get('/breakfast',function(req,res,next){
  let context = {};
  context.title = "Breakfast";

  // Select all from the test_table
  let query = "select r.name as recipeName, c.name as categoryName from recipe r inner join recipe_category rc on r.id = rc.recipe_id inner join category c on rc.category_id = c.id where rc.category_id=1";

  pg.query(query, (err, result) => {
    if(err){
      next(err);
      return;
    }

    context.results = result.rows;
    res.render('breakfast', context);
  });
});

/*
display recipes for lunch
*/
app.get('/lunch',function(req,res,next){
  let context = {};
  context.title = "Lunch";

  // Select all from the test_table
  let query = "select r.name as recipeName, c.name as categoryName from recipe r inner join recipe_category rc on r.id = rc.recipe_id inner join category c on rc.category_id = c.id where rc.category_id=2";

  pg.query(query, (err, result) => {
    if(err){
      next(err);
      return;
    }

    context.results = result.rows;
    res.render('lunch', context);
  });
});


/*
display recipes for dinner
*/
app.get('/dinner',function(req,res,next){
  let context = {};
  context.title = "Dinner";

  // Select all from the test_table
  let query = "select r.name as recipeName, c.name as categoryName from recipe r inner join recipe_category rc on r.id = rc.recipe_id inner join category c on rc.category_id = c.id where rc.category_id=3";

  pg.query(query, (err, result) => {
    if(err){
      next(err);
      return;
    }

    context.results = result.rows;
    res.render('dinner', context);
  });
});

/*
dispay ingredients for recipes
*/

app.get('/ingredients/:recipename', function(req,res, next){
  let context = {};
  var recipe = req.params.recipename;
  context.title = "Ethical Eating - " + recipe;

  // Select all from the test_table
  let query = `select r.name as recipeName, i.name as ingredientList
              from recipe r
              inner join recipe_ingredient ri on r.id = ri.recipe_id 
              inner join ingredient i on ri.ingredient_id = i.id
              where r.name = $1`;

  var inserts = [recipe];
  console.log(recipe);
  pg.query(query, inserts, (err, result) => {
    if(err){
      next(err);
      return;
    }

    context.results = result.rows;
    res.render('ingredients', context);
  });
});


/*
The /getIngredients endpoint returns a list of all ingredients in the database and their IDs
 */
app.post('/getIngredients', function (req, res, next) {

  // Construct the query
  const query = `select * from ingredient i order by name asc`;

  // Run the query and send response
  pg.query(query, function(err, result){
    if(err){
      next(err);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result.rows));
  });
});

/*
The /getEthicalProblemForIngredientId endpoint takes the id of an ingredient as parameter and returns as a response
the name of the ingredient and the title of the ethical problem.
 */
app.post('/getEthicalProblemForIngredientId', function (req, res, next) {

  // Construct the query
  const query = {
    text: `select i.name as ingredient, p.title as problem 
           from ingredient_ethical_problem ip 
           inner join ethical_problem p on ip.problem_id = p.id 
           inner join ingredient i on i.id = ip.ingredient_id 
           where ip.ingredient_id = $1`,
    values: [req.body["id"]]
  };

  // Run the query and send response
  pg.query(query, function(err, result){
    if(err){
      next(err);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result.rows));
  });
});





/*
The /getRecipeByCategory endpoint takes an id of a category as a parameter and returns a list of all the recipes within that category
 */
app.post('/getRecipesByCategoryId', function (req, res, next) {

  // Construct the query
  const query = {
    text: `select r.name as recipeName
	        from recipe r 
	        inner join recipe_category rc on r.id = rc.recipe_id 
	        inner join category c on rc.category_id = c.id
          where c.id = $1`,
    values: [req.body["id"]]
  };
  

  // Run the query and send response
  pg.query(query, function(err, result){
    if(err){
      next(err);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result.rows));
  });
});

/*
The /getIngredientsByRecipeId endpoint takes an id of a recipe as a parameter and returns a list of all the ingredients for that recipe
 */
app.post('/getIngredientsByRecipeId', function (req, res, next) {

  // Construct the query
  const query = {
    text: `select i.name as ingredientList
          from recipe r
          inner join recipe_ingredient ri on r.id = ri.recipe_id 
          inner join ingredient i on ri.ingredient_id = i.id
          where r.id = $1`,
    values: [req.body["id"]]
  };

  // Run the query and send response
  pg.query(query, function(err, result){
    if(err){
      next(err);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result.rows));
  });
});

/*
The /getAlternativesForIngredientId endpoint takes the id of an ingredient as parameter and returns as a response
the name of the ingredient and a list of alternatives.
 */
app.post('/getAlternativesForIngredientId', function (req, res, next) {

  // Construct the query
  const query = {
    text: `select i.name as ingredient, alt.name as alternative 
           from ingredient i 
           inner join ingredient_alternative ia on i.id = ia.ingredient_id 
           inner join ingredient alt on ia.alternative_id = alt.id 
           where i.id = $1`,
    values: [req.body["id"]]
  };

  testq = 'select i.name as ingredient from ingredient i where i.id = 1'

  console.log(req.body.rows);

  // Run the query and send response
  pg.query(query, function(err, result){
    if(err){
      next(err);
      return;
    }
    console.log(result)
    // Initialize a dictionary to store the response
    var response = {};
    // The 'ingredient' key stores the name the the ingredient
    response['ingredient'] = result.rows[0]['ingredient'];
    // The 'alternatives' (plural) key stores an array of alternatives for this ingredient
    response['alternatives'] = [];

    // Add the alternatives from Postgres to the response
    for (let i = 0; i < result.rows.length; i++) {
      let alternative = result.rows[i]['alternative'];
      response['alternatives'].push(alternative);
    }

    // Send the response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  });
});


app.post('/getIngredientForCustomRecipe', function (req, res, next) {

  // query to get ingredient name
  const name_query = {
    text: `select ingredient.name as ingredient from ingredient where ingredient.id = $1`,
    values: [req.body["id"]]
  };

  // Initialize a dictionary to store the response
  var response = {};

  // Run the query and send response
  pg.query(name_query, function(err, result){
    if(err){
      next(err);
      return;
    }

    // The 'ingredient' key stores the name the the ingredient
    response['ingredient'] = result.rows[0]['ingredient'];

    // Query to get alternatives of ingredient
    const alt_query = {
      text: `select alt.name as alternative 
             from ingredient i 
             inner join ingredient_alternative ia on i.id = ia.ingredient_id 
             inner join ingredient alt on ia.alternative_id = alt.id 
             where i.id = $1`,
      values: [req.body["id"]]
    };

    // Nested query call 1
    pg.query(alt_query, function(err, result) {
      if(err) {
        next(err);
        return;
      }

      // The 'alternative' key stores a list of the ingredient's alternatives
      response['alternative'] = []

      if (result.rows.length) {
        for (let i = 0; i < result.rows.length; i++) {
          let alternative = result.rows[i]['alternative'];
          response['alternative'].push(alternative);
        }
      } else {
        response['alternative'].push("None");
      }

      // Query to get ingredient's ethical problem
      const ethic_query = {
        text: `select e.title as problem from ingredient i
                inner join ingredient_ethical_problem ie on i.id = ie.ingredient_id
                inner join ethical_problem e on ie.problem_id = e.id
                where i.id = $1`,
        values: [req.body["id"]]
      };
    
      // Nested query call 2
      pg.query(ethic_query, function(err, result) {
        if(err) {
          next(err);
          return;
        }

        // The 'problem' key holds the ingredient's ethical problem
        response['problem'] = "None";
        if(result.rows.length) {
          response['problem'] = result.rows[0]['problem'];
        }
        

      });

      // Query to get ingredient's ethical problem's description

      const ethical_description_query = {
        text: `select ee.explain as description from ingredient i
                inner join ingredient_ethical_problem ie on i.id = ie.ingredient_id
                inner join ethical_problem e on ie.problem_id = e.id
                inner join ethical_description ee on e.id = ee.id
                where i.id =  $1`,
        values: [req.body["id"]]
      };
    
      // Nested query call 3
      pg.query(ethical_description_query, function(err, result) {
        if(err) {
          next(err);
          return;
        }

        response['description'] = "None";
        if(result.rows.length) {
          response['description'] = result.rows[0]['description'];
        }
        
        // Send the response
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
      });
      
      
    });
  });
});

app.post('/register', async function(req, res, next) {
  var context = {success: null}
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword); // remove later
  let query = `INSERT INTO account (first_name, last_name, email, username, password) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.username}', '${hashedPassword}');`;
  pg.query(query, (err, result) => {
    if(err){
      next(err);
      return;
    }
    context.success = true
    res.send(context);
  })
});

app.post('/validateUsername', function(req, res, next) {
  var context = {success: null}
  let query = `SELECT account.username FROM account where account.username='${req.body.username}'`;
  pg.query(query, (err, result) => {
    if(err){
      next(err);
      return;
    }
    // if the select finds something.
    if (result.rowCount > 0) {
      context.success = false
    } else {
      context.success = true
    }
    res.send(context);
  })
});

app.post('/validateEmail', function(req, res, next) {
  var context = {success: null}
  let query = `SELECT account.email FROM account where account.email='${req.body.email}'`;
  pg.query(query, (err, result) => {
    if(err){
      next(err);
      return;
    }
    // if the select finds something.
    if (result.rowCount > 0) {
      context.success = false
    } else {
      context.success = true
    }
    res.send(context);
  })
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


app.post('/getRecipesByCategoryId', function (req, res, next) {

  // Construct the query
  const query = {
    text: `select r.name as recipeName
	        from recipe r 
	        inner join recipe_category rc on r.id = rc.recipe_id 
	        inner join category c on rc.category_id = c.id
          where c.id = $1`,
    values: [req.body["id"]]
  };

  // Run the query and send response
  pg.query(query, function(err, result){
    if(err){
      next(err);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result.rows));
  });
});


