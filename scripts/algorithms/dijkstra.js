import { ROWS, COLUMNS } from '../constants.js';
import { Node, getIdFromCoordinates, findNeighbours, getCoodinatesFromId, traceback } from './utils.js';



function dijkstra(startRow, startColumn, endRow, endColumn, weight){
    //Mark all the nodes as unvisited
    const unvisited = new Set();
    const distances = new Map();
    const previous = new Map();
    const explored = [];

    for (let row = 0; row < ROWS; row++){
        for (let col = 0; col < COLUMNS; col++){
            const id = getIdFromCoordinates(row, col);
            unvisited.add(id);
            distances.set(id, Infinity);
            previous.set(id, null);
        }
    }

    //Set the distance of the starting node to 0
    const startId = getIdFromCoordinates(startRow, startColumn)
    distances.set(startId, 0);

    while (true){
        //Find the cell with the lowest distance
        let currentId = '';
        let min = Infinity;

        for (const [ key, value ] of distances.entries()){

            if (unvisited.has(key)){

                if (value < min){
                    currentId = key;
                    min = value;
                }

            }
        }
        

        explored.push(currentId);

        const currentDistance = distances.get(currentId);
        const [ currentRow, currentCol ] = getCoodinatesFromId(currentId);

        const neighbours = findNeighbours(currentRow, currentCol);

        for (const neighbour of neighbours){
            const [ neighbourRow, neighbourCol ] = neighbour;
            const neighbourId = getIdFromCoordinates(neighbourRow, neighbourCol);

            if (unvisited.has(neighbourId) && !document.getElementById(neighbourId).classList.contains('wall')){
                const distance = document.getElementById(neighbourId).classList.contains('weight') ? weight : 1;
                const newDistance = currentDistance + distance;

                if (newDistance < distances.get(neighbourId)){
                    distances.set(neighbourId, newDistance);
                    previous.set(neighbourId, currentId);
                }
                
            }
        }

        unvisited.delete(currentId);

        if (currentId === getIdFromCoordinates(endRow, endColumn)){
            const cell = createTraceback(previous, currentId, startId);
            return [ cell, explored ];
        }

    }

}

function createTraceback(previous, endId, startId){

    let currentId = endId;
    const orderedId = [endId];

    while(currentId !== startId){
        const previousId = previous.get(currentId);
        orderedId.unshift(previousId);
        currentId = previousId;
    }

    orderedId.unshift(startId);

    let currentNode;
    let previousNode = null;

    for (const id of orderedId){
        currentNode = new Node(getCoodinatesFromId(id), previousNode);
        previousNode = currentNode;
    }
    
    return traceback(currentNode);

}

export { dijkstra };