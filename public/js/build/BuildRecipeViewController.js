class BuildRecipeViewController {
  constructor() {
    this.recipe_ingredients = {};
  }

  pageDidLoad() {
    document.addEventListener('DOMContentLoaded', this.loadPageContent.bind(this));
  }

  loadPageContent() {

    let si = new ServerInteractor();

    si.getAllIngredients((ingredients) => {
      console.log(ingredients);

      let ingredients_table_body = document.getElementById("ingredients-table-body");

      for (let i = 0; i < ingredients.length; i++) {
        let row = document.createElement('tr');

        // Add the ID cell
        let ingredient_id = ingredients[i]['id'];
        let id_cell = document.createElement('td');
        id_cell.textContent = ingredient_id;
        row.appendChild(id_cell);

        // Add the name cell
        let ingredient_name = ingredients[i]['name'];
        let name_cell = document.createElement('td');
        name_cell.textContent = ingredient_name;
        row.appendChild(name_cell);

        // Add an "Add to recipe" button
        let addButton = document.createElement('button');
        addButton.textContent = "Add";

        // Use the BuildRecipeFunctionFactory to create an add ingredient function
        let ff = new BuildRecipeFunctionFactory();
        let addFunction = ff.createAddIngredientFunction(ingredient_id, ingredient_name, this);

        // When user clicks on the Add button, add it to the recipe table
        addButton.addEventListener('click', addFunction);
        // Append the add button to the ingredient row
        row.appendChild(addButton);

        //Add an "Info" button
        let infoButton = document.createElement('button');
        infoButton.textContent = "Info";
        // When user clicks on Info button, ingredient info show ups asynchronously on page
        infoButton.addEventListener('click', function() {
          function myCallback(result) {
            document.getElementById("ingredient-name").textContent = result.ingredient;
          }
          si.getIngredientInfo(myCallback, ingredient_id);
        });
        row.appendChild(infoButton);

        // Add the row
        ingredients_table_body.appendChild(row);
      }
    });
  }
}

let vc = new BuildRecipeViewController();
vc.pageDidLoad();