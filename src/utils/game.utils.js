const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }
  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

function createBoardNums(rows = 4) {
  const totalNums = rows * rows;
  const boardNums = [];
  for (let num = 1; num < totalNums; num++) {
    boardNums.push(num);
  }
  boardNums.push(0);
  return boardNums;
}

function createBoard(numArray) {
  const rowColumns = Math.sqrt(numArray.length);
  const board = [];
  for (let rowNum = 0; rowNum < rowColumns; rowNum++) {
    const row = [];
    for (let colNum = 0; colNum < rowColumns; colNum++) {
      const randIndex = Math.floor(Math.random() * numArray.length);
      const randNum = numArray[randIndex];
      numArray.splice(randIndex, 1);
      row.push(randNum);
    }
    board.push(row);
  }
  return board;
}

function canMoveUp(board, indices) {
  if (indices.rowIndex === 0) {
    return false;
  }

  if (board[indices.rowIndex - 1][indices.columnIndex] === 0) {
    return true;
  } else {
    return false;
  }
}

function canMoveDown(board, indices) {
  if (indices.rowIndex >= board.length - 1) {
    return false;
  }

  if (board[indices.rowIndex + 1][indices.columnIndex] === 0) {
    return true;
  } else {
    return false;
  }
}

function canMoveLeft(board, indices) {
  if (indices.columnIndex === 0) {
    return false;
  }
  if (board[indices.rowIndex][indices.columnIndex - 1] === 0) {
    return true;
  } else {
    return false;
  }
}

function canMoveRight(board, indices) {
  if (indices.columnIndex >= board.length - 1) {
    return false;
  }
  if (board[indices.rowIndex][indices.columnIndex + 1] === 0) {
    return true;
  } else {
    return false;
  }
}

function moveUp(board, indices) {
  const selected = board[indices.rowIndex][indices.columnIndex];
  const upperItem = board[indices.rowIndex - 1][indices.columnIndex];

  board[indices.rowIndex][indices.columnIndex] = upperItem;
  board[indices.rowIndex - 1][indices.columnIndex] = selected;
  return;
}

function moveDown(board, indices) {
  const selected = board[indices.rowIndex][indices.columnIndex];
  const downItem = board[indices.rowIndex + 1][indices.columnIndex];

  board[indices.rowIndex][indices.columnIndex] = downItem;
  board[indices.rowIndex + 1][indices.columnIndex] = selected;
  return;
}

function moveLeft(board, indices) {
  const selected = board[indices.rowIndex][indices.columnIndex];
  const leftItem = board[indices.rowIndex][indices.columnIndex - 1];

  board[indices.rowIndex][indices.columnIndex] = leftItem;
  board[indices.rowIndex][indices.columnIndex - 1] = selected;
  return;
}

function moveRight(board, indices) {
  const selected = board[indices.rowIndex][indices.columnIndex];
  const rightItem = board[indices.rowIndex][indices.columnIndex + 1];

  board[indices.rowIndex][indices.columnIndex] = rightItem;
  board[indices.rowIndex][indices.columnIndex + 1] = selected;
  return;
}

function moveTile(oldBoard, indices) {
  const board = deepCopyFunction(oldBoard);
  if (canMoveDown(board, indices)) {
    moveDown(board, indices);
    return board;
  }
  if (canMoveUp(board, indices)) {
    moveUp(board, indices);
    return board;
  }
  if (canMoveLeft(board, indices)) {
    moveLeft(board, indices);
    return board;
  }
  if (canMoveRight(board, indices)) {
    moveRight(board, indices);
    return board;
  }
  return board;
}

function hasWon(board, solvedBoard) {
  const flattedBoard = board.flat();
  return flattedBoard.every((val, index) => val === solvedBoard[index]);
}

export { createBoard, createBoardNums, hasWon, moveTile };
