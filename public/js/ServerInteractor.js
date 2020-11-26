class ServerInteractor {
  constructor() {
    var loc = window.location;
    this.baseUrl = loc.protocol + "//" + loc.hostname + (loc.port? ":"+loc.port : "")
  }

  getAllIngredients(callback) {
    let req = new XMLHttpRequest();
    req.open('POST', this.baseUrl + '/getIngredients', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function() {
      if(req.status >= 200 && req.status < 400){
        let response = JSON.parse(req.responseText);
        callback(response);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send();
  }

  // getIngredientInfo(ingredient_id, callback) {
  //   let req = new XMLHttpRequest();
  //   req.open('POST', this.baseUrl + '/getIngredientForCustomRecipe', true);
  //   req.setRequestHeader('Content-Type', 'application/json');
  //   let payload = JSON.stringify({"id":ingredient_id});
  //   req.addEventListener('load', function() {
  //     if(req.status >= 200 && req.status < 400) {
  //       callback(JSON.parse(req.responseText));
  //     } else {
  //       console.log("Error in network request: " + req.statusText);
  //     }
  //   })
  //   req.send(payload);
  // }

  getIngredientInfo(ingredient_id, callback) {
    let index = ['/getEthicalProblemForIngredientId', '/getEthicalDescriptionForIngredientId', '/getAlternativesForIngredientId'];
    let payload = JSON.stringify({"id":ingredient_id});
    let callbackResult = {};

    for (let i = 0; i < index.length; i++) {
      let req = new XMLHttpRequest();
      req.open('POST', this.baseUrl + index[i], true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
          let response = JSON.parse(req.responseText);

          for (const property in response) {
            callbackResult[property] = response[property];
            // console.log(callbackResult[property]); // CAN ACCESS PROPERTIES NORMALLY
          }
        } else {
          console.log("Error in network request: " + req.statusText);
        }
      });
      req.send(payload);
    }
    console.log(callbackResult);
    // console.log(callbackResult.problem)  // CANNOT ACCESS PROPERTIES
    callback(callbackResult);
  }

  saveRecipe(name, ingredients, callback) {
    let req = new XMLHttpRequest();
    req.open('POST', this.baseUrl + '/saveRecipe', true);
    req.setRequestHeader('Content-Type', 'application/json');
    let payload = JSON.stringify({name: name, ingredients: ingredients});
    req.addEventListener('load',function() {
      if(req.status >= 200 && req.status < 400){
        let response = JSON.parse(req.responseText);
        callback(response);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(payload);
  }
}