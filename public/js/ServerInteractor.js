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

  getIngredientInfo(ingredient_id, callback) {
    let index = ['/getEthicalProblemForIngredientId', '/getEthicalDescriptionForIngredientId', '/getAlternativesForIngredientId'];
    let payload = JSON.stringify({"id":ingredient_id});
    let callbackResult = {};
    let self = this;

    function serverCall(route) {
      return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('POST', self.baseUrl + route, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
          if(req.status >= 200 && req.status < 400) {
            let response = JSON.parse(req.responseText);
            for (const property in response) {
              callbackResult[property] = response[property];
            }
            resolve(callbackResult);
          } else {
            console.log("Error in network request: " + req.statusText);
          }
        });
        req.send(payload);
      })
    }

    // build list of server calls to make
    let promiseList = [];
    for (let i = 0; i < index.length; i++) {
      promiseList.push(serverCall(index[i]))
    }

    // wait for all server calls to finish before returning
    Promise.all(promiseList).then(function() {
      callback(callbackResult);
    });
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