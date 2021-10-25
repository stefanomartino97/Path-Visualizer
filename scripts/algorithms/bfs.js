import { findNeighbours } from './utils.js';
import { traceback } from './utils.js';
import { Node } from './utils.js';

function bfs(startRow, startColumn, endRow, endColumn){
    const visited = new Set();
    const toVisit = [];

    const root = new Node([ startRow, startColumn ], null);
    let neighbours = findNeighbours(startRow, startColumn);
    
    for (let neighbour of neighbours){
        toVisit.push(new Node(neighbour, root));
    }

    while(toVisit.length){
        const currentCell = toVisit.shift();
        const [ currentCellRow, currentCellColumn ] = currentCell.data;
        
        const id = `${currentCellRow}-${currentCellColumn}`

        if (!visited.has(id) && !document.getElementById(id).classList.contains('wall')){

            visited.add(id);
            document.getElementById(id).classList.add('explored');

            if (currentCellRow === endRow && currentCellColumn === endColumn){
                return traceback(currentCell);
            }

            const neighbours = findNeighbours(currentCellRow, currentCellColumn);

            for (let neighbour of neighbours){
                toVisit.push(new Node(neighbour, currentCell));
            }
        }

        
    }
    

}

export { bfs };