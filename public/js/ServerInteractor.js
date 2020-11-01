class ServerInteractor {
  constructor() {
    var loc = window.location;
    this.baseUrl = loc.protocol + "//" + loc.hostname + (loc.port? ":"+loc.port : "")
  }

  getAllIngredients(callBack) {
    let req = new XMLHttpRequest();
    req.open('POST', this.baseUrl + '/getIngredients', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function() {
      if(req.status >= 200 && req.status < 400){
        let response = JSON.parse(req.responseText);
        callBack(response);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send();
  }
}