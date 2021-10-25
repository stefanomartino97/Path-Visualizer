const draggableOptions = {
        containment: '#grid',
        cursor: 'grab',
        snap: '.cell',
        helper: 'clone' //Todo: definisci meglio l'helper
    }

const droppableOptions = {
    drop: handleDrop
};

let canPaintWall = false;

function handleDrop(event, ui){
    const draggableClass = ui.draggable[0].classList;
    const _class = draggableClass.contains('start') ? 'start' : 'end';
    
    ui.draggable.draggable("disable");
    ui.draggable.droppable("enable");
    ui.draggable.droppable(droppableOptions);
    ui.draggable.removeClass(_class);
    
    const currentElementId = event.target.id;
    
    $(`[id="${currentElementId}"]`).draggable(draggableOptions);
    
    $(`[id="${currentElementId}"]`).droppable('disable');
    $(`[id="${currentElementId}"]`).addClass(_class);
    
    const icon = ui.draggable[0].childNodes[0];
    document.getElementById(currentElementId).appendChild(icon);
    
}

//Deal Drag&Drop of Start and End cells
function setStartAndEnd(){
    const cells = $('.cell');
    cells.droppable(droppableOptions);

    const start = $('.start');
    const end = $('.end');

    start.droppable('disable');
   
    end.droppable('disable');
    
    
    start.draggable(draggableOptions);
    end.draggable(draggableOptions);
}

function setPaintWall(){
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++){
        if (!cells[i].classList.contains('start') && !cells[i].classList.contains('end')){

            cells[i].onmousedown = () => {
                cells[i].classList.add('wall');
                canPaintWall = true;
            }

            cells[i].onmouseover = () => {
                if (canPaintWall){
                     cells[i].classList.add('wall');
                }
            }

            cells[i].onmouseup = (event) => {
                canPaintWall = false;
                
            }
        }
    }
}

function setDragAndDrop(){
    setStartAndEnd();
    setPaintWall();
}

export { setDragAndDrop };