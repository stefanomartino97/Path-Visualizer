import { ROWS, COLUMNS } from "../constants.js";

function findNeighbours(row, column) {
  const neighbours = [];

  if (row !== 0) {
    neighbours.push([row - 1, column]);
  }

  if (row !== ROWS - 1) {
    neighbours.push([row + 1, column]);
  }

  if (column !== 0) {
    neighbours.push([row, column - 1]);
  }

  if (column !== COLUMNS - 1) {
    neighbours.push([row, column + 1]);
  }

  return neighbours;
}

function getIdFromCoordinates(row, column) {
  return `${row}-${column}`;
}

function getCoodinatesFromId(id) {
  let [row, col] = id.split("-");
  return [parseInt(row), parseInt(col)];
}

function traceback(cell) {
  const result = [];
  let currentCell = cell;

  while (currentCell !== null) {
    const [currentRow, currentColumn] = currentCell.data;
    result.unshift(getIdFromCoordinates(currentRow, currentColumn));
    currentCell = currentCell.parent;
  }

  return result;
}

class Node {
  constructor(data, parent) {
    this.data = data;
    this.parent = parent;
  }
}

function animate(exploredCells, bestPath, ms) {
  let i = 0;
  const exploredInterval = setInterval(() => {
    if (i >= exploredCells.length) {
      clearInterval(exploredInterval);

      let k = 0;
      const pathInterval = setInterval(() => {
        if (k >= bestPath.length) {
          clearInterval(pathInterval);
          document
            .getElementById("visualize")
            .classList.remove("visualize-animation");
          return;
        }

        document.getElementById(bestPath[k]).classList.add("path");
        k++;
      }, ms);

      return;
    }

    document.getElementById(exploredCells[i]).classList.add("explored");
    i++;
  }, ms);
}

export { findNeighbours };
export { traceback };
export { Node };
export { getIdFromCoordinates, getCoodinatesFromId };
export { animate };
