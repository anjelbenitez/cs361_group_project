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
        // show notification that adding ingredient was not successful
        let notifDiv = document.getElementById("alert-div");
        let notif = document.createElement("div");
        notif.textContent = `${ingredient_name} (ID ${ingredient_id}) is already in the recipe.`;
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

        // create button to remove ingredient
        let removeButton_cell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.setAttribute("id", "remove-" + ingredient_id);

        removeButton.addEventListener('click', function() {
          recipe_table_body.removeChild(row);
          delete brvc.recipe_ingredients[ingredient_id];

          // show notification that ingredient was removed successfully
          let notifDiv = document.getElementById("alert-div");
          let notif = document.createElement("div");
          notif.textContent = `${ingredient_name} (ID ${ingredient_id}) was removed from the recipe.`;
          notif.classList.add("alert", "remove-success");
          notifDiv.prepend(notif);
          setTimeout(function() { notif.remove() }, 2000);
        });

        removeButton_cell.appendChild(removeButton);
        row.appendChild(removeButton_cell);

        // create button to get ingredient info
        let infoButton = document.createElement("button");
        infoButton.textContent = "Info";
        infoButton.addEventListener("click", function() {
          document.getElementById("info-" + ingredient_id).click();
        })

        let infoButtonCell = document.createElement("td");
        infoButtonCell.appendChild(infoButton);
        row.appendChild(infoButtonCell);

        recipe_table_body.appendChild(row);

        brvc.recipe_ingredients[ingredient_id] = ingredient_name;

        // show notification that ingredient was added successfully
        let notifDiv = document.getElementById("alert-div");
        let notif = document.createElement("div");
        notif.textContent = `${ingredient_name} (ID ${ingredient_id}) was added to the recipe.`;
        notif.classList.add("alert");
        notifDiv.prepend(notif);
        setTimeout(function() { notif.remove() }, 10000);
      }
    };
  }
} 