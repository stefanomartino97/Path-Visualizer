let canPaintWall = false;

const draggableOptions = {
  containment: "#grid",
  cursor: "grab",
  snap: ".cell",
  helper: "clone",
};

const droppableOptions = {
  drop: handleDrop,
};

function handleDrop(event, ui) {
  const draggedElement = ui.draggable;
  const currentElement = $(`[id="${event.target.id}"]`);
  const _class = draggedElement.hasClass("start") ? "start" : "end";

  if (!currentElement.hasClass("wall") && !currentElement.hasClass("weight")) {
    disableDraggable(draggedElement);
    setDroppable(draggedElement);
    draggedElement.removeClass(_class);
    setPaintable(document.getElementById(draggedElement.attr("id")));

    disablePaintable(document.getElementById(currentElement.attr("id")));
    setDraggable(currentElement);
    disableDroppable(currentElement);
    currentElement.addClass(_class);

    const icon = draggedElement[0].childNodes[0];
    document.getElementById(event.target.id).appendChild(icon);
  }
}

function setDraggable(element) {
  element.draggable(draggableOptions);
}

function disableDraggable(element) {
  console.log("dra", element);
  element.draggable("disable");
}

function setDroppable(element) {
  element.droppable(droppableOptions);
}

function disableDroppable(element) {
  element.droppable("disable");
}

function setPaintable(element) {
  element.onmousedown = () => {
    element.classList.add("wall");
    canPaintWall = true;
  };

  element.onmouseover = () => {
    if (canPaintWall) {
      element.classList.add("wall");
    }
  };

  element.onmouseup = () => {
    canPaintWall = false;
  };
}

function disablePaintable(element) {
  element.onmousedown = () => {};

  element.onmouseover = () => {};

  element.onmouseup = () => {};
}

function setDragAndDrop() {
  //Set all cells paintable and droppable, except for start end end (not paintable and draggable)
  const cells = $(".cell");
  cells.each(function () {
    const element = document.getElementById($(this).attr("id"));
    if ($(this).hasClass("start") || $(this).hasClass("end")) {
      disablePaintable(element);
      setDraggable($(this));
    } else {
      setDroppable($(this));
      setPaintable(element);
    }
  });
}

export { setDragAndDrop };
