class TableBuilder {
  constructor(body) {
    this.body = body;
  }

  createRow() {
    let row = document.createElement('tr');
    this.body.appendChild(row);
    return row;
  }

  createTextOnlyCell(row, textContent) {
    let cell = document.createElement('td');
    cell.textContent = textContent;
    row.appendChild(cell);
    return cell;
  }
}