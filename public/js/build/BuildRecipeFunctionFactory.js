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


        // swap ingredient feature
        let si = new ServerInteractor();
        let swapButton_cell = document.createElement('td');
        let swapButton = document.createElement('button');
        swapButton.textContent="Swap";

        let alternative_table_body = document.getElementById("alternative-table-body");

        //adding swap button, need to add function to swap
        swapButton.addEventListener('click', function() {
          function myCallback(result) {
            document.getElementById("ingredient-name").textContent = result.ingredient;
            document.getElementById("ingredient-ethics").textContent = result.problem;
            
            for(let i = 0; i < result.alternative.length; i++){

              let alt_row = document.createElement('tr');

              let table_name = result.alternative[i]['ingredient_alternative']
              
              let alt_name = document.createElement('td');
              alt_name.textcontent = document.getElementById("ingredient-alternatives").innerHTML = result.alternative.join("<br>");
              alt_row.append(alt_name);
  
              
              let infoSwap_cell = document.createElement('td');
              let infoSwap = document.createElement("button");
              infoSwap.textContent = "Swap Ingredient";
              
              infoSwap_cell.appendChild(infoSwap);
              alt_row.appendChild(infoSwap);
              alternative_table_body.appendChild(alt_row);
  



            }


          }
          si.getIngredientInfo(myCallback, ingredient_id);
        });

        swapButton_cell.appendChild(swapButton);
        row.appendChild(swapButton);
        recipe_table_body.appendChild(row);

        brvc.recipe_ingredients[ingredient_id] = ingredient_name;
      }
    };
  }  
} 