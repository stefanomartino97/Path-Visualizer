import { ROWS, COLUMNS } from '../constants.js';

function findNeighbours(row, column){
    const neighbours = [];

    if (row !== 0){
        neighbours.push([row-1, column])
    }

    if (row !== ROWS - 1){
        neighbours.push([row+1, column]);
    }

    if (column !== 0){
        neighbours.push([row, column-1]);
    }

    if (column !== COLUMNS - 1){
        neighbours.push([row, column+1]);
    }

    return neighbours;
}

function traceback(cell){
    const result = [];
    let currentCell = cell;

    while (currentCell !== null){
        const [ currentRow, currentColumn ] = currentCell.data;
        result.unshift((`${currentRow}-${currentColumn}`));
        currentCell = currentCell.parent;
    }

    return result;
}

class Node{
    constructor(data, parent){
        this.data = data;
        this.parent = parent;
    }
}

export { findNeighbours };
export { traceback };
export { Node };