dataObject = {}

function generateGrid(rows, cols) {
  const table = document.createElement('table');

  const headerRow = document.createElement('tr');
  const columnHeader = document.createElement('th');
  columnHeader.textContent = ' ';
  headerRow.appendChild(columnHeader);

  for (let col = 0; col < cols; col++) {
    const headerCell = document.createElement('th');
    let columnName = '';

    let quotient = Math.floor(col / 26);
    if (quotient > 0) {
      columnName += String.fromCharCode(64 + quotient);
    }

    columnName += String.fromCharCode(65 + (col % 26));
    headerCell.textContent = columnName;
    headerRow.appendChild(headerCell);
  }

  table.appendChild(headerRow);

  for (let row = 1; row <= rows; row++) {
    const tableRow = document.createElement('tr');

    const rowLabelCell = document.createElement('td');
    rowLabelCell.textContent = row;
    tableRow.appendChild(rowLabelCell);

    for (let col = 1; col <= cols; col++) {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.value = '';
      cell.appendChild(input);
      tableRow.appendChild(cell);
      cell.addEventListener('change', handleInput);
      cell.addEventListener('click', getCellCoordinates);
    }

    table.appendChild(tableRow);
  }

  document.body.appendChild(table);
}

function handleInput(event) {
  const inputValue = event.target.value
  const coordinates = getCellCoordinates(event)
  console.log(coordinates)
  dataObject[coordinates] = inputValue
  console.log(dataObject)
}

function getCellCoordinates(event) {
  coordinatesDisplay = document.getElementById('cell_coordinates')
  const rowIndex = event.target.parentNode.parentNode.rowIndex
  const colIndexNum = event.target.parentNode.cellIndex
  const colIndex = getColumnName(colIndexNum)
  coordinatesDisplay.textContent = `${colIndex}${rowIndex}`
  return colIndex.concat(rowIndex)
}

function getColumnName(colIndex) {
  console.log(colIndex)
  let columnName = '';
  let quotient = Math.floor(colIndex / 26);
  console.log(quotient)
  if (quotient > 0) {
    columnName += String.fromCharCode(64 + quotient);
  }
  columnName += String.fromCharCode(64 + (colIndex % 26));
  return columnName;
}

generateGrid(100, 100)
