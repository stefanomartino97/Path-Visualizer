import { ROWS, COLUMNS } from "./constants.js";
import { getIdFromCoordinates } from "./algorithms/utils.js";

const walls = [];

function recursive(minRow, maxRow, minCol, maxCol) {
  if (maxRow - minRow < 2 || maxCol - minCol < 2) return;

  const rowRange = maxRow - minRow;
  const colRange = maxCol - minCol;
  const range = rowRange + colRange;
  const rowOrCol = Math.round(Math.random() * range);

  const currentWalls = [];
  if (rowOrCol < rowRange) {
    //Row
    const randomRow = Math.floor(Math.random() * (maxRow - minRow) + minRow);
    for (let col = minCol; col < maxCol; col++)
      currentWalls.push(getIdFromCoordinates(randomRow, col));
    //Make passage
    currentWalls.splice(Math.round(Math.random() * currentWalls.length), 1);
    walls.push(...currentWalls);
    recursive(minRow, randomRow - 2, minCol, maxCol);
    recursive(randomRow + 2, maxRow, minCol, maxCol);
  } else {
    //Col
    const randomCol = Math.floor(Math.random() * (maxCol - minCol) + minCol);
    for (let row = minRow; row < maxRow; row++)
      currentWalls.push(getIdFromCoordinates(row, randomCol));
    //Make passage
    currentWalls.splice(Math.round(Math.random() * currentWalls.length), 1);
    walls.push(...currentWalls);
    recursive(minRow, maxRow, minCol, randomCol - 2);
    recursive(minRow, maxRow, randomCol + 2, maxCol);
  }
}

function recursiveMaze() {
  recursive(0, ROWS - 1, 0, COLUMNS - 1);
  let index = 0;

  const interval = setInterval(() => {
    const currentCell = document.getElementById(walls[index]);

    if (
      !currentCell.classList.contains("start") &&
      !currentCell.classList.contains("end")
    ) {
      currentCell.classList.add("wall");
    }

    index++;

    if (index >= walls.length) {
      clearInterval(interval);
      return;
    }
  }, 5);
}

function mazes() {
  document.getElementById("recursive").onclick = function () {
    recursiveMaze();
  };
}

export { mazes };
