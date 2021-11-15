import { dijkstra } from "./dijkstra.js";
import { a_star_search } from "./a_star_search.js";
import { bfs } from "./bfs.js";
import { dfs } from "./dfs.js";
import { animate } from "./utils.js";

const speeds = {
  slow: 300,
  medium: 100,
  fast: 10,
};

function getStartAndEnd() {
  const start = document.getElementsByClassName("start")[0];
  const end = document.getElementsByClassName("end")[0];

  const startId = start.getAttribute("id");
  let [startRow, startColumn] = startId.split("-");
  startRow = parseInt(startRow);
  startColumn = parseInt(startColumn);

  const endId = end.getAttribute("id");
  let [endRow, endColumn] = endId.split("-");
  endRow = parseInt(endRow);
  endColumn = parseInt(endColumn);

  return [startRow, startColumn, endRow, endColumn];
}

function displayStats(algorithm, bestPath, exploredCells, weight) {
  let stats = "";
  if (bestPath.length === 0) {
    stats = `<b>&nbsp;${algorithm}&nbsp;</b> couldn't find a best path`;
  } else {
    let totalCost = 0;
    for (const id of bestPath)
      totalCost += document.getElementById(id).classList.contains("weight")
        ? weight
        : 1;

    const stats = `<b>&nbsp;${algorithm}&nbsp;</b> explored <b>&nbsp;${exploredCells.length}&nbsp;</b> cells. Best path cost: <b>&nbsp;${totalCost}&nbsp;</b>`;
  }

  $("#stats-popup").html(stats);
  $("#outer-stats-popup").fadeIn();
  setTimeout(() => {
    $("#outer-stats-popup").fadeOut();
  }, 3000);
}

function findPath(algorithm, speed, weight) {
  //Start visualize animation
  const visualize = document.getElementById("visualize");
  visualize.classList.add("visualize-animation");

  const [startRow, startColumn, endRow, endColumn] = getStartAndEnd();
  let func = "";

  switch (algorithm) {
    case "A*":
      func = a_star_search;
      console.log("ecco");
      break;
    case "BFS":
      func = bfs;
      break;
    case "DFS":
      func = dfs;
      break;
    case "Dijkstra":
      func = dijkstra;
      break;
    default:
      func = bfs;
  }

  const [bestPath, exploredCells] = func(
    startRow,
    startColumn,
    endRow,
    endColumn,
    weight
  );
  animate(exploredCells, bestPath, speeds[speed], () =>
    displayStats(algorithm, bestPath, exploredCells, weight)
  );
}

export { findPath };
