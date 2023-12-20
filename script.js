MAX_COLS = 100
MAX_ROWS = 100

const dataObject = {}

function generateGrid(rows, cols, existingData) {
  const table = createTableWithHeader(cols)
  populateTableWithCells(table, rows, cols, existingData)
  document.body.appendChild(table)
}

function createTableWithHeader(cols) {
  const table = document.createElement('table')
  table.appendChild(createHeaderRow(cols))
  return table
}

function createHeaderRow(cols) {
  const headerRow = document.createElement('tr')
  headerRow.appendChild(createEmptyHeaderCell())

  for (let col = 0; col < cols; col++) {
    headerRow.appendChild(createHeaderCells(col))
  }

  return headerRow
}

function createEmptyHeaderCell() {
  return createHeaderCells(-1, ' ')
}

function createHeaderCells(col, columnName = getColumnLabel(col)) {
  const headerCell = document.createElement('th')
  headerCell.textContent = columnName
  return headerCell
}

function getColumnLabel(col) {
  let columnName = ''
  const quotient = Math.floor(col / 26)

  if (quotient > 0) {
    columnName += String.fromCharCode(64 + quotient)
  }

  columnName += String.fromCharCode(65 + (col % 26))
  return columnName
}

function populateTableWithCells(table, rows, cols, existingData) {
  for (let row = 1; row <= rows; row++) {
    const tableRow = document.createElement('tr')
    tableRow.appendChild(createRowLabelCell(row))

    for (let col = 1; col <= cols; col++) {
      const cell = createDataCell(row, col, existingData)
      tableRow.appendChild(cell)
    }

    table.appendChild(tableRow)
  }
}

function createRowLabelCell(row) {
  const cell = createCell('td', row)
  cell.classList.add('row-label')
  return cell
}

function createDataCell(row, col, existingData) {
  const cell = createCell('td')
  const input = document.createElement('input')
  input.type = 'text'
  const coordinates = `${getColumnName(col)}${row}`

  if (existingData[coordinates] !== undefined) {
    input.value = existingData[coordinates]
  }

  cell.appendChild(input)
  cell.addEventListener('change', handleInput)
  return cell
}

function createCell(cellType, textContent = '') {
  const cell = document.createElement(cellType)
  cell.textContent = textContent
  return cell
}

function handleInput(event) {
  const inputValue = event.target.value
  const coordinates = getCellCoordinates(event)

  if (inputValue.startsWith('=')) {
    try {
      const result = evaluateFormula(inputValue.substring(1))
      dataObject[coordinates] = result
      event.target.value = result
    } catch (error) {
      console.error('Error evaluating formula:', error.message)
    }
  } else {
    dataObject[coordinates] = inputValue
  }
  console.log(dataObject)
}

function evaluateFormula(formula) {
  const regex = /[A-Z]+\d+/g
  const cellReferences = formula.match(regex)

  if (cellReferences) {
    cellReferences.forEach((reference) => {
      const value = dataObject[reference] || 0
      formula = formula.replace(reference, value)
    })

    const result = eval(formula)
    return result
  } else {
    throw new Error('Invalid formula format')
  }
}

function getCellCoordinates(event) {
  const rowIndex = event.target.parentNode.parentNode.rowIndex
  const colIndex = getColumnName(event.target.parentNode.cellIndex)
  return `${colIndex}${rowIndex}`
}

function getColumnName(colIndex) {
  let columnName = ''
  let quotient = Math.floor(colIndex / 26)
  if (colIndex !== 26) {
    if (quotient > 0) {
      columnName += String.fromCharCode(64 + quotient)
    }
    columnName += String.fromCharCode(64 + (colIndex % 26))
  } else {
    columnName = 'Z'
  }
  return columnName
}

function refreshGrid() {
  const oldTable = document.querySelector('table')
  if (oldTable) {
    document.body.removeChild(oldTable)
  }

  generateGrid(MAX_ROWS, MAX_COLS, dataObject)
}

generateGrid(MAX_ROWS, MAX_COLS, dataObject)
