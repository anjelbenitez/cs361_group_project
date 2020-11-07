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

  getIngredientInfo(callback, ingredient_id) {
    let req = new XMLHttpRequest();
    req.open('POST', this.baseUrl + '/testCall', true);
    req.setRequestHeader('Content-Type', 'application/json');
    let payload = JSON.stringify({"id":ingredient_id});
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        callback(JSON.parse(req.responseText));
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    })
    req.send(payload);
  }
}