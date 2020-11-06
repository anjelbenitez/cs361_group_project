var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

// Connect with Postgres
const { Client } = require('pg');
const pg = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/ethical_eating",
    // ssl: {
    //   rejectUnauthorized: false
    // }
});
pg.connect();

app.get('/',function(req,res,next){
    let context = {};
    context.title = "Ethical Eating";
    res.render('home', context);
});

app.get('/build',function(req,res,next){
  let context = {};
  context.title = "Ethical Eating";
  res.render('build', context);
});

app.get('/dbtest',function(req,res,next){
  let context = {};
  context.title = "Ethical Eating";

  // Select all from the test_table
  let query = "select r.name as recipeName, i.name as ingredientName from recipe r inner join recipe_ingredient ri on r.id = ri.recipe_id inner join ingredient i on ri.ingredient_id = i.id";

  pg.query(query, (err, result) => {
    if(err){
      next(err);
      return;
    }

    context.results = result.rows;
    res.render('home', context);
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


app.post('/testCall', function (req, res, next) {

  // Construct the query
  const query = {
    text: `select i.name as ingredient from ingredient i where i.id = $1`,
    values: [req.body["id"]]
  };

  // Run the query and send response
  pg.query(query, function(err, result){
    if(err){
      next(err);
      return;
    }
    console.log(result.rows)
    // Initialize a dictionary to store the response
    var response = {};
    // The 'ingredient' key stores the name the the ingredient
    response['ingredient'] = result.rows[0]['ingredient'];

    // Send the response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  });
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
