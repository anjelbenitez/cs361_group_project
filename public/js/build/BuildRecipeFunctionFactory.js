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
        // alert(`Ingredient ${ingredient_name} (ID ${ingredient_id}) is already in the recipe.`);

        let notifDiv = document.getElementById("alert-div");
        let notif = document.createElement("div");
        notif.textContent = `Ingredient ${ingredient_name} (ID ${ingredient_id}) is already in the recipe.`;
        notif.classList.add("alert", "add-error");
        notifDiv.prepend(notif);
        setTimeout(function() { notif.remove() }, 2000);
      }
      else {
        let recipe_table_body = document.getElementById("recipe-table-body");
        let row = document.createElement('tr');
        row.setAttribute("id", ingredient_id);

        let id_cell = document.createElement('td');
        id_cell.textContent = ingredient_id;
        row.appendChild(id_cell);

        let name_cell = document.createElement('td');
        name_cell.textContent = ingredient_name;
        row.appendChild(name_cell);

        let removeButton_cell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = "Remove";

        removeButton.addEventListener('click', function() {
          recipe_table_body.removeChild(row);
          delete brvc.recipe_ingredients[ingredient_id];
        });
        
        removeButton_cell.appendChild(removeButton);
        row.appendChild(removeButton_cell);

        recipe_table_body.appendChild(row);

        brvc.recipe_ingredients[ingredient_id] = ingredient_name;

        let notifDiv = document.getElementById("alert-div");
        let notif = document.createElement("div");
        notif.textContent = `${ingredient_name} (ID ${ingredient_id}) was added to the recipe.`;
        notif.classList.add("alert");
        notifDiv.prepend(notif);
        setTimeout(function() { notif.remove() }, 2000);
      }
    };
  }  

  // This function removes an ingredient from the current custom recipe list.
  removeIngredient(ingredient_id, brvc) {
    if (ingredient_id in brvc.recipe_ingredients) {
      delete brvc.recipe_ingredients[ingredient_id];
      let row = document.getElementById(ingredient_id);
      row.parentNode.removeChild(row);
    }
  }
} 