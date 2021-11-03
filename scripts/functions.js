import { findPath } from "./algorithms/main.js";
let currentModal = 0;

const parameters = {
  algorithm: "Dijkstra",
  speed: "fast",
};

function clear(...classes) {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove(...classes);
  }
}

function modal() {
  document.getElementById("close").onclick = function () {
    $("#modal").fadeOut();
  };

  const modalPages = $(".outer-modal-page");
  modalPages.eq(0).fadeIn();

  document.getElementById("next-button").onclick = function () {
    const oldModal = currentModal;
    currentModal = (currentModal + 1) % modalPages.length;

    if (currentModal !== 0) {
      document.getElementById("previous-button").classList.remove("disabled");
    }

    if (currentModal === modalPages.length - 1) {
      document.getElementById("next-button").classList.add("disabled");
    }
    modalPages.eq(oldModal).fadeOut(() => {
      modalPages.eq(currentModal).fadeIn();
    });
  };

  document.getElementById("previous-button").onclick = function () {
    const oldModal = currentModal;
    currentModal = (currentModal - 1) % modalPages.length;

    if (currentModal == 0) {
      document.getElementById("previous-button").classList.add("disabled");
    }

    if (currentModal < modalPages.length - 1) {
      document.getElementById("next-button").classList.remove("disabled");
    }

    modalPages.eq(oldModal).fadeOut(() => {
      modalPages.eq(currentModal).fadeIn();
    });
  };
}

function addClicksToNavBar() {
  //Initialize active parameters
  document.getElementById(parameters.algorithm).classList.add("active");
  document.getElementById(parameters.speed).classList.add("active");
  document.getElementById("algorithm-name").innerHTML = parameters.algorithm;
  //Set algorithms click
  const algorithms = document.getElementsByClassName("algorithm");
  for (let i = 0; i < algorithms.length; i++) {
    algorithms[i].onclick = () => {
      parameters.algorithm = algorithms[i].getAttribute("id");
      document
        .getElementsByClassName("algorithm active")[0]
        .classList.remove("active");
      algorithms[i].classList.add("active");
      document.getElementById("algorithm-name").innerHTML =
        parameters.algorithm;
    };
  }

  //Set speed click
  const speeds = document.getElementsByClassName("speed");
  for (let i = 0; i < speeds.length; i++) {
    speeds[i].onclick = () => {
      parameters.speed = speeds[i].getAttribute("id");
      document
        .getElementsByClassName("speed active")[0]
        .classList.remove("active");
      speeds[i].classList.add("active");
    };
  }

  const visualize = document.getElementById("visualize");
  visualize.onclick = () => {
    const weight = parseInt(document.getElementById("weight-range").value);
    findPath(parameters.algorithm, parameters.speed, weight);
  };

  const clearBoard = document.getElementById("clear-board");
  clearBoard.onclick = () => {
    $(".weight").empty();
    clear("wall", "weights", "explored", "path");
  };

  const clearWallsAndWeights = document.getElementById(
    "clear-walls-and-weights"
  );
  clearWallsAndWeights.onclick = () => {
    $(".weight").empty();
    clear("wall", "weight");
  };

  const clearPath = document.getElementById("clear-path");
  clearPath.onclick = () => {
    clear("explored", "path");
  };

  //Weight Range
  document.getElementById("current-weight").innerHTML = document.getElementById(
    "weight-range"
  ).value = 1;

  document.getElementById("weight-range").oninput = () => {
    document.getElementById("current-weight").innerHTML =
      document.getElementById("weight-range").value;
  };

  modal();
}

export { addClicksToNavBar };
