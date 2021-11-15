import { ROWS, COLUMNS } from "../constants.js";
import {
  getIdFromCoordinates,
  findNeighbours,
  getCoodinatesFromId,
  traceback,
} from "./utils.js";

function isWeight(id) {
  return document.getElementById(id).classList.contains("weight");
}

function isWall(id) {
  return document.getElementById(id).classList.contains("wall");
}

function heuristic(row, col, endRow, endCol) {
  return Math.abs(row - endRow) + Math.abs(col - endCol);
}

class PriorityQueue {
  constructor() {
    this._priorityQueue = [];
  }

  pop() {
    return this._priorityQueue.shift().element;
  }

  _binarySearch(list, priority, low, high) {
    if (list.length == 0) return 0;

    if (high >= low) {
      return priority > list[low].priority ? low + 1 : low;
    }

    const mid = Math.floor((minIndex + maxIndex) / 2);
    const midPriority = list[mid].priority;

    if (priority === midPriority) return mid + 1;

    if (priority > midPriority)
      return this._binarySearch(list, priority, mid + 1, high);

    return this._binarySearch(list, priority, low, mid - 1);
  }

  add(node, priority) {
    const index = this._binarySearch(
      this._priorityQueue,
      priority,
      0,
      this.length
    );

    this._priorityQueue.splice(index, 0, {
      element: node,
      priority: priority,
    });
  }

  get length() {
    return this._priorityQueue.length;
  }

  contains(node) {
    for (const obj of this._priorityQueue) {
      if (obj.element.id === node.id) return true;
    }
    return false;
  }

  replace(node, priority) {
    let index = 0;
    for (const obj of this._priorityQueue) {
      if (obj.element.id === node.id && obj.priority > priority) {
        this._priorityQueue.splice(index, 1);
        this.add(node, priority);
        return;
      }

      index++;
    }
  }

  toString() {
    return this._priorityQueue;
  }
}

class Node {
  constructor(row, col, parent, f, g, h) {
    this.row = row;
    this.col = col;
    this.parent = parent;
    this.f = f;
    this.g = g;
    this.h = h;
    this.id = getIdFromCoordinates(row, col);
  }

  get data() {
    return [this.row, this.col];
  }
}

function a_star_search(startRow, startColumn, endRow, endColumn, weight) {
  const frontier = new PriorityQueue();
  const startNode = new Node(startRow, startColumn, null, 0, 0, 0);
  frontier.add(startNode, 0);
  const exploredSet = new Set();
  const exploredList = [];

  while (frontier.length) {
    console.log(frontier.toString());
    const currentNode = frontier.pop();

    if (currentNode.row === endRow && currentNode.col === endColumn) {
      return [traceback(currentNode), exploredList];
    }

    exploredSet.add(currentNode.id);
    exploredList.push(currentNode.id);

    const neighbours = findNeighbours(currentNode.row, currentNode.col);
    for (const neighbour of neighbours) {
      const [neighbourRow, neighbourCol] = neighbour;

      if (isWall(getIdFromCoordinates(neighbourRow, neighbourCol))) continue;

      const g =
        currentNode.g +
        (isWeight(getIdFromCoordinates(neighbourRow, neighbourCol))
          ? weight
          : 1);
      const h = heuristic(neighbourRow, neighbourCol, endRow, endColumn);
      const f = g + h;
      const neighbourNode = new Node(
        neighbourRow,
        neighbourCol,
        currentNode,
        f,
        g,
        h
      );

      if (
        !(exploredSet.has(neighbourNode.id) || frontier.contains(neighbourNode))
      ) {
        frontier.add(neighbourNode, f);
      } else if (frontier.contains(neighbourNode)) {
        frontier.replace(neighbourNode, f);
      }
    }
  }

  return [[], exploredList];
}

export { a_star_search };
