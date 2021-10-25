import { dijkstra } from './dijkstra.js';
import { bfs } from './bfs.js';

const speeds = {
    slow: 300,
    medium: 100,
    fast: 10
};

function getStartAndEnd(){
    const start = document.getElementsByClassName('start')[0];
    const end = document.getElementsByClassName('end')[0];

    const startId = start.getAttribute('id');
    let [ startRow, startColumn ] = startId.split('-');
    startRow = parseInt(startRow);
    startColumn = parseInt(startColumn);

    const endId = end.getAttribute('id');
    let [ endRow, endColumn ] = endId.split('-');
    endRow = parseInt(endRow);
    endColumn = parseInt(endColumn);

    return [startRow, startColumn, endRow, endColumn];

}

function findPath(algorithm, speed, weight){
    const [ startRow, startColumn, endRow, endColumn ] = getStartAndEnd();
    let func = bfs;
    switch(algorithm){
        case 'bfs':
            func = bfs;
            break;
        default:
            func = bfs;
    }

    const best_path = func(startRow, startColumn, endRow, endColumn, weight);
    
    let i = 0;
    setInterval(() => {
        document.getElementById(best_path[i]).classList.add('path');
        i++;
    }, speeds[speed]);
    
}

export { findPath };