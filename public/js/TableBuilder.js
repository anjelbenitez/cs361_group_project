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

  createButtonCell(row, buttonText, buttonFunction) {
    let cell = document.createElement('td');
    row.appendChild(cell);

    let button = document.createElement('button');
    cell.appendChild(button);
    button.textContent = buttonText;
    button.addEventListener('click', buttonFunction);
    return cell;
  }
}