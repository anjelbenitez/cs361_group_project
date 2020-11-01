class BuildRecipeViewController {
  constructor() {

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

        // Add the row
        ingredients_table_body.appendChild(row);

      }
    });
  }
}

let vc = new BuildRecipeViewController();
vc.pageDidLoad();