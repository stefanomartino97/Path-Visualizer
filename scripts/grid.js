import { ROWS, COLUMNS } from './constants.js';
import { START_ROW, START_COLUMN, END_ROW, END_COLUMN } from './constants.js';
import { START_ICON_CLASS, END_ICON_CLASS } from './constants.js';

//Function that creates the grid
function createGrid(){
    const grid = document.getElementById('grid');
    for (let row = 0; row < ROWS; row++){
        for (let col = 0; col < COLUMNS; col++){
            const cell = document.createElement('div');
            cell.className = "cell";
            cell.id = `${row}-${col}`
            grid.appendChild(cell);
        }
    }
}

function placeStartAndEnd(){
    const startNode = document.createElement('i');
    startNode.className = START_ICON_CLASS;   

    const endNode = document.createElement('i');
    endNode.className = END_ICON_CLASS;   

    const startCell = document.getElementById(`${START_ROW}-${START_COLUMN}`);
    const endCell = document.getElementById(`${END_ROW}-${END_COLUMN}`);

    startCell.classList.add('start');
    endCell.classList.add('end');

    startCell.appendChild(startNode);
    endCell.appendChild(endNode);
}

export { placeStartAndEnd }
export { createGrid };
