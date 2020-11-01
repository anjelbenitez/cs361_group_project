class BuildRecipeViewController {
  constructor() {
    this.recipe_ingredients = {};
  }

  pageDidLoad() {
    document.addEventListener('DOMContentLoaded', this.loadPageContent);
  }

  loadPageContent() {
    console.log("BuildRecipeViewController loading page content");

    let si = new ServerInteractor();
    si.getAllIngredients(function (ingredients) {
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

        // When user clicks on the Add button, add it to the recipe table
        addButton.addEventListener('click', function () {
          let recipe_table_body = document.getElementById("recipe-table-body");
          let row = document.createElement('tr');

          let id_cell = document.createElement('td');
          id_cell.textContent = ingredient_id;
          row.appendChild(id_cell);

          let name_cell = document.createElement('td');
          name_cell.textContent = ingredient_name;
          row.appendChild(name_cell);

          recipe_table_body.appendChild(row);
        });
        // Append the add button to the ingredient row
        row.appendChild(addButton);

        // Add the row
        ingredients_table_body.appendChild(row);

      }
    });
  }
}

let vc = new BuildRecipeViewController();
vc.pageDidLoad();