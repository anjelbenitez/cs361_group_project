class BuildRecipeFunctionFactory {
  constructor() {};

  /*
  The createAddIngredientFunction function takes an ingredient's ID and name as the first two parameters.
  The third parameter is an instance of the BuildRecipeViewController class.
  It returns a function that will add the ingredient to the recipe-table-body and the recipe_ingredients object.
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

        let removeButton_cell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = "Remove";

        let ff = new BuildRecipeFunctionFactory();
        let removeFunction = ff.createRemoveIngredientFunction(row, ingredient_id, brvc);

        removeButton.addEventListener('click', removeFunction);
        removeButton_cell.appendChild(removeButton);
        row.appendChild(removeButton_cell);

        recipe_table_body.appendChild(row);

        brvc.recipe_ingredients[ingredient_id] = ingredient_name;
      }
    };
  }

  /*
  The createRemoveIngredientFunction function takes a table row to remove and an ingredient's ID
  as the first two parameters.
  The third parameter is an instance of the BuildRecipeViewController class.
  It returns a function that will remove the ingredient from recipe-table-body and the recipe_ingredients object.
   */
  createRemoveIngredientFunction(row_to_remove, ingredient_id, brvc) {
    return function () {
      let recipe_table_body = row_to_remove.parentElement;
      recipe_table_body.removeChild(row_to_remove);
      delete brvc.recipe_ingredients[ingredient_id];
    }
  }

  createInfoFunction(ingredient_id) {
    return function () {
      let si = new ServerInteractor();

      si.getIngredientInfo(ingredient_id, (result) => {
        console.log(result);
        // Update Ingredient Info box on page async
        document.getElementById("ingredient-name").textContent = result.ingredient;
        document.getElementById("ingredient-ethics").textContent = result.problem;
        document.getElementById("ingredient-alternatives").innerHTML = result.alternative.join("<br>");
      })
    }
  }
} 