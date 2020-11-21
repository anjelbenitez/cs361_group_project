class TableBuilder {
  constructor(body) {
    this.body = body;
  }

  createRow() {
    let row = document.createElement('tr');
    this.body.appendChild(row);
    return row;
  }
}