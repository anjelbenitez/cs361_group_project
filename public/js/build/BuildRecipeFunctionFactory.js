class BuildRecipeFunctionFactory {
  constructor() {};

  /*
  The createAddIngredientFunction function takes an ingredient's ID and name as the first two parameters.
  The third parameter is an instance of the BuildRecipeViewController class.
  It returns a function that will add the ingredient to the recipe-table-body and the recipe_ingredients object.
   */
  createAddIngredientFunction(ingredient_id, ingredient_name, brvc) {
    return function () {
      let recipe_table_body = document.getElementById("recipe-table-body");
      let nm = new NotificationManager();
      let tb = new TableBuilder(recipe_table_body);

      if (ingredient_id in brvc.recipe_ingredients) {
        nm.createErrorNotification(ingredient_name);
      }
      else { 
        let row = tb.createRow();
        row.setAttribute("id", ingredient_id);

        tb.createTextOnlyCell(row, ingredient_id);
        tb.createTextOnlyCell(row, ingredient_name);

        let removeFunction = function() {
          recipe_table_body.removeChild(row);
          delete brvc.recipe_ingredients[ingredient_id];
          nm.createRemoveNotification(ingredient_name);
        }
        
        tb.createButtonCell(row, "Remove", ingredient_id, removeFunction);
        tb.createReferenceButtonCell(row, "Info", ingredient_id);

        recipe_table_body.appendChild(row);
        brvc.recipe_ingredients[ingredient_id] = ingredient_name;
        nm.createSuccessNotification(ingredient_name);
      }
    };
  }

  createInfoFunction(ingredient_id) {
    return function () {
      let si = new ServerInteractor();
      let ff = new BuildRecipeFunctionFactory();

      si.getIngredientInfo(ingredient_id, (result) => {
        console.log(result);
        // Update Ingredient Info box on page async
        document.getElementById("ingredient-name").textContent = result.ingredient;
        document.getElementById("ingredient-ethics").textContent = result.problem;

        // Populate alternatives table with names and buttons
        let altTable = document.getElementById("alt-table");
        altTable.innerHTML = "";
        if (result.alternative != "None") {
          for (let i = 0; i < result.alternative.length; i++) {
            let altRow = altTable.insertRow();

            // Add a cell to hold alternative name
            let altNameCell = altRow.insertCell();
            altNameCell.appendChild(document.createTextNode(result.alternative[i]));

            // Add a cell to hold 'Add' button
            let altAddCell = altRow.insertCell();
            let altAddButton = document.createElement("button");
            altAddButton.textContent = "Add";
            altAddButton.addEventListener("click", function() {
              document.getElementById("Add" + result.alternative_id[i]).click();
            });
            altAddCell.appendChild(altAddButton);

            // Add a cell to hold 'Replace' button
            let altReplaceCell = altRow.insertCell();
            let altReplaceButton = document.createElement("button");
            let altReplaceFunction = function() {
              let removeButton = document.getElementById("Remove" + result.ingredient_id);
              if (removeButton) {
                removeButton.click();
              }
              altAddButton.click();
            }
            altReplaceButton.textContent = "Replace";
            altReplaceButton.addEventListener("click", altReplaceFunction);
            altReplaceCell.appendChild(altReplaceButton);
          }
        } else {
          altTable.innerHTML = "None";
        }
      });
    }
  } 
} 
