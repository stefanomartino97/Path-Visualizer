import { createGrid } from './grid.js';
import { placeStartAndEnd } from './grid.js';
import { setDragAndDrop } from './dragAndDrop.js';
import { addClicksToNavBar } from './functions.js';
//Create the grid
createGrid();

//Place Start and End icons
placeStartAndEnd();

//Set Drag and Drop
setDragAndDrop();

addClicksToNavBar();