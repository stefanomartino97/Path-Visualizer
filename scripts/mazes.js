import { ROWS, COLUMNS } from "./constants.js";
import { getIdFromCoordinates } from "./algorithms/utils.js";

function clear(...classes) {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove(...classes);
  }
}

function recursive(minRow, maxRow, minCol, maxCol, walls) {
  if (maxRow - minRow < 1 || maxCol - minCol < 1) return;

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
    recursive(minRow, randomRow - 1, minCol, maxCol, walls);
    recursive(randomRow + 1, maxRow, minCol, maxCol, walls);
  } else {
    //Col
    const randomCol = Math.floor(Math.random() * (maxCol - minCol) + minCol);
    for (let row = minRow; row < maxRow; row++)
      currentWalls.push(getIdFromCoordinates(row, randomCol));
    //Make passage
    currentWalls.splice(Math.round(Math.random() * currentWalls.length), 1);
    walls.push(...currentWalls);
    recursive(minRow, maxRow, minCol, randomCol - 1, walls);
    recursive(minRow, maxRow, randomCol + 1, maxCol, walls);
  }
}

function recursiveMaze() {
  const walls = [];
  $(".weight").empty();
  clear("wall", "weights", "explored", "path");
  recursive(0, ROWS - 1, 0, COLUMNS - 1, walls);
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

function randomMaze() {
  $(".weight").empty();
  clear("wall", "weights", "explored", "path");
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let walls = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      walls.push(getIdFromCoordinates(row, col));
    }
  }

  walls = shuffle(walls);
  const numberOfWalls = Math.floor(Math.random() * 400 + 100);
  walls = walls.slice(0, numberOfWalls);

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

  document.getElementById("random").onclick = function () {
    randomMaze();
  };
}

export { mazes };
