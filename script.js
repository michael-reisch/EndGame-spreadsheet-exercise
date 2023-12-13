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

  // Create rows with row labels 1-100
  for (let row = 1; row <= rows; row++) {
    const tableRow = document.createElement('tr')

    // Create first cell with row label
    const rowLabelCell = document.createElement('td')
    rowLabelCell.textContent = row
    tableRow.appendChild(rowLabelCell)

    // Create cells for each column with input fields
    for (let col = 1; col <= cols; col++) {
      const cell = document.createElement('td')
      const input = document.createElement('input')
      input.type = 'text'
      input.value = ''
      cell.appendChild(input)
      tableRow.appendChild(cell)
      cell.addEventListener('click', handleCellClick)
      table.appendChild(tableRow)
    }
  }
  document.body.appendChild(table)
}

function handleCellClick(event) {
  const rowIndex = event.target.parentNode.parentNode.rowIndex
  const colIndexNum = event.target.parentNode.cellIndex
  const colIndex = String.fromCharCode(64 + colIndexNum)
  console.log(colIndex.concat(rowIndex))
}

generateGrid(100, 26)
