const draggableOptions = {
        containment: '#grid',
        cursor: 'grab',
        snap: '.cell',
        helper: 'clone' //Todo: definisci meglio l'helper
    }

const droppableOptions = {
    drop: handleDrop
};

function handleDrop(event, ui){
   //Trova la classe del draggable
        //Rendi quel draggable non draggable e droppable
        //Rendi questo droppable non droppable e draggable
    //Aggiungi classe
    //Aggiungi icona

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

function setDragAndDrop(){
    const cells = $('.cell');
    cells.droppable(droppableOptions);

    const start = $('.start');
    const end = $('.end');

    start.droppable('disable');
   
    end.droppable('disable');
    
    
    start.draggable(draggableOptions);
    end.draggable(draggableOptions);
}

export { setDragAndDrop };