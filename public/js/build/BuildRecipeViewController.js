class BuildRecipeViewController {
  constructor() {
    this.recipe_ingredients = {};
  }

  pageDidLoad() {
    // Call the loadPageContent function when the DOM finishes loading
    document.addEventListener('DOMContentLoaded', this.loadPageContent.bind(this));

    // Bind the save button to the saveRecipe function
    // Explicitly bind the BuildRecipeViewController instance to the function call
    let save_button = document.getElementById('save_button');
    save_button.addEventListener('click', this.saveRecipe.bind(this));
  }

  loadPageContent() {

    let si = new ServerInteractor();

    si.getAllIngredients((ingredients) => {

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
        let infoFunction = ff.createInfoFunction(ingredient_id);
        infoButton.addEventListener('click', infoFunction);
        row.appendChild(infoButton);

        // Add the row
        ingredients_table_body.appendChild(row);
      }
    });
  }

  saveRecipe() {

    let name_field = document.getElementById("recipe_name");
    let name = name_field.value;

    // Test if the name field is empty
    if (name_field.value === "") {
      alert("Recipe name cannot be empty!");
      return;
    }

    // Test if the list of ingredients is empty
    if (Object.keys(this.recipe_ingredients).length === 0 && this.recipe_ingredients.constructor === Object) {
      alert("There is no ingredient in your recipe!");
      return;
    }

    // Save the recipe
    let si = new ServerInteractor();
    si.saveRecipe(name, this.recipe_ingredients, (response) => {
      if (response.error) {
        alert(response.error);
      }
      else {
        alert("Recipe was saved successfully!");
      }
    });
  }
}

let vc = new BuildRecipeViewController();
vc.pageDidLoad();