import { findNeighbours } from "./utils.js";
import { traceback } from "./utils.js";
import { Node } from "./utils.js";
import { getIdFromCoordinates } from "./utils.js";

function dfs(startRow, startColumn, endRow, endColumn) {
  //Used to check if a cell has already been visited
  const visited = new Set();

  //Used to store the order in which the cells are visited to create the delayed animation
  const explored = [];

  //Used to store the cells yet to visit
  const toVisit = [];

  const root = new Node([startRow, startColumn], null);
  toVisit.push(root);

  do {
    const currentCell = toVisit.pop();

    const [currentCellRow, currentCellColumn] = currentCell.data;
    const id = getIdFromCoordinates(currentCellRow, currentCellColumn);

    if (
      !visited.has(id) &&
      !document.getElementById(id).classList.contains("wall")
    ) {
      visited.add(id);
      explored.push(id);

      if (currentCellRow === endRow && currentCellColumn === endColumn) {
        return [traceback(currentCell), explored];
      }

      const neighbours = findNeighbours(currentCellRow, currentCellColumn);

      for (let neighbour of neighbours) {
        toVisit.push(new Node(neighbour, currentCell));
      }
    }
  } while (toVisit.length);

  return [[], explored];
}

export { dfs };
