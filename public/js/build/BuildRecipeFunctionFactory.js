class BuildRecipeFunctionFactory {
  constructor() {};

  /*
  The createAddIngredientFunction function takes an ingredient's ID and name as the first two parameters.
  The third parameter is an instance of the BuildRecipeViewController class.
  It returns a function that will add the ingredient to the recipe-table-body and the recipe_ingredients object.
   */
  createAddIngredientFunction(ingredient_id, ingredient_name, brvc) {
    return function () {
      let ff = new BuildRecipeFunctionFactory();

      if (ingredient_id in brvc.recipe_ingredients) {
        // show notification that ingredient is already in the recipe
        ff.createNotification("error", ingredient_name);
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

          ff.createNotification("remove", ingredient_name);
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

        ff.createNotification("success", ingredient_name);
      }
    };
  }

  /*
  The createNotification function takes two strings as parameters: the notification type and ingredient name.
  It creates a visual indicator when the user makes changes to the recipe.
  */
  createNotification(alertType, ingredient_name) {
    let alertDiv = document.getElementById("alert-div");
    let alert = document.createElement("div");
    alert.classList.add("alert");
    let alertString = `${ingredient_name} was added to the recipe.`;
    
    // modify notification appearance based on alertType
    if (alertType == "error") {
      alertString = `${ingredient_name} is already in the recipe.`;
      alert.classList.add("add-error")
    } else if (alertType == "remove") {
      alertString = `${ingredient_name} was removed from the recipe.`;
      alert.classList.add("remove-success")
    }

    alert.textContent = alertString;
    alertDiv.prepend(alert);

    setTimeout(() => {
      alert.remove()
    }, 8000);
  }
} 