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
        ff.createNotification("error", ingredient_name);
      }
      else {
        let recipe_table_body = document.getElementById("recipe-table-body");
        let row = document.createElement('tr');

        row.setAttribute("id", ingredient_id);
        row.appendChild(ff.createIdCell(ingredient_id));
        row.appendChild(ff.createNameCell(ingredient_name));

        let removeButton = ff.createRemoveButton(ingredient_id);
        removeButton.addEventListener('click', function() {
          recipe_table_body.removeChild(row);
          delete brvc.recipe_ingredients[ingredient_id];
          ff.createNotification("remove", ingredient_name);
        });
        row.appendChild(ff.createButtonCell(removeButton));

        let infoButton = ff.createInfoButton();
        infoButton.addEventListener("click", function() {
          document.getElementById("info-" + ingredient_id).click();
        });
        row.appendChild(ff.createButtonCell(infoButton));

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

  /* The createIdCell function returns a table cell containing the given ingredient's ID. */
  createIdCell(ingredient_id) {
    let id_cell = document.createElement('td');
    id_cell.textContent = ingredient_id;
    return id_cell;
  }

  /* The createNameCell function returns a table cell containing the given ingredient's name. */
  createNameCell(ingredient_name) {
    let name_cell = document.createElement('td');
    name_cell.textContent = ingredient_name;
    return name_cell;
  }

  /* The createRemoveButtonCell function returns a table cell containing a given button. */
  createButtonCell(button) {
    let buttonCell = document.createElement('td');
    buttonCell.appendChild(button);
    return buttonCell;
  }

  /* The createRemoveButton function returns a button used to remove the ingredient from the recipe. */
  createRemoveButton(ingredient_id) {
    let removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.setAttribute("id", "remove-" + ingredient_id);
    return removeButton;
  }

  /* The createInfoButton function returns a button used to get ingredient info. */
  createInfoButton() {
    let infoButton = document.createElement("button");
    infoButton.textContent = "Info";
    return infoButton;
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
      });
    }
  } 
} 
