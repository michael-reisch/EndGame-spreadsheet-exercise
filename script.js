dataObject = {}

function generateGrid(rows, cols) {
  const table = document.createElement('table')
  const headerRow = document.createElement('tr')

  // Create header cells with column labels A-Z
  for (let col = 0; col <= cols; col++) {
    const headerCell = document.createElement('th')
    if (col > 0) {
      headerCell.textContent = String.fromCharCode(64 + col) // A is 65 in ASCII
    }
    headerRow.appendChild(headerCell)
  }

  table.appendChild(headerRow)

  for (let row = 1; row <= rows; row++) {
    const tableRow = document.createElement('tr')

    const rowLabelCell = document.createElement('td')
    rowLabelCell.textContent = row
    tableRow.appendChild(rowLabelCell)

    for (let col = 1; col <= cols; col++) {
      const cell = document.createElement('td')
      const input = document.createElement('input')
      input.type = 'text'
      input.value = ''
      cell.appendChild(input)
      tableRow.appendChild(cell)
      cell.addEventListener('change', handleInput)
      cell.addEventListener('click', getCellCoordinates)
      table.appendChild(tableRow)
    }
  }
  document.body.appendChild(table)
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
  const colIndex = String.fromCharCode(64 + colIndexNum)
  coordinatesDisplay.textContent = `${colIndex}${rowIndex}`
  return colIndex.concat(rowIndex)
}

generateGrid(100, 26)
