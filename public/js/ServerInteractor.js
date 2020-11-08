class BuildRecipeFunctionFactory {
  constructor() {};

  /*
  The createAddIngredientFunction function takes an ingredient's ID and name as the first two parameters.
  The
  It returns a function that will add the ingredient to the recipe-table-body.
   */
  createAddIngredientFunction(ingredient_id, ingredient_name, brvc) {
    return function () {

      if (ingredient_id in brvc.recipe_ingredients) {
        alert(`Ingredient ${ingredient_name} (ID ${ingredient_id}) is already in the recipe.`);
      }
      else {
        let recipe_table_body = document.getElementById("recipe-table-body");
        let row = document.createElement('tr');

        let id_cell = document.createElement('td');
        id_cell.textContent = ingredient_id;
        row.appendChild(id_cell);

        let name_cell = document.createElement('td');
        name_cell.textContent = ingredient_name;
        row.appendChild(name_cell);

        recipe_table_body.appendChild(row);

        brvc.recipe_ingredients[ingredient_id] = ingredient_name;
      }
    };
  }

  getIngredientInfo(callback, ingredient_id) {
    let req = new XMLHttpRequest();
    req.open('POST', this.baseUrl + '/getIngredientForCustomRecipe', true);
    req.setRequestHeader('Content-Type', 'application/json');
    let payload = JSON.stringify({"id":ingredient_id});
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        callback(JSON.parse(req.responseText));
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    })
    req.send(payload);
  }
}