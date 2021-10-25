const parameters = {
    algorithm: 'Dijkstra',
    speed: 'medium'
};

function clear(...classes){
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++){
        cells[i].classList.remove(...classes);
    }
}

function addClicksToNavBar(){
    //Initialize active parameters
    document.getElementById(parameters.algorithm).classList.add('active');
    document.getElementById(parameters.speed).classList.add('active');
    document.getElementById('algorithm-name').innerHTML = parameters.algorithm;
    //Set algorithms click
    const algorithms = document.getElementsByClassName('algorithm');
    for (let i = 0; i < algorithms.length; i++){
        algorithms[i].onclick = () => {
            parameters.algorithm = algorithms[i].getAttribute('id');
            document.getElementsByClassName("algorithm active")[0].classList.remove('active');
            algorithms[i].classList.add('active');
            document.getElementById('algorithm-name').innerHTML = parameters.algorithm;
        }
    }

    //Set speed click
    const speeds = document.getElementsByClassName('speed');
    for (let i = 0; i < speeds.length; i++){
        speeds[i].onclick = () => {
            parameters.speed = speeds[i].getAttribute('id');
            document.getElementsByClassName("speed active")[0].classList.remove('active');
            speeds[i].classList.add('active');
        }
    }

    const visualize = document.getElementById('visualize');
    visualize.onclick = () => {
        console.log(parameters);
    }

    const clearBoard = document.getElementById('clear-board');
    clearBoard.onclick = () => {
        clear("wall", "weights", "explored", "path");
    }

    const clearWallsAndWeights = document.getElementById('clear-walls-and-weights');
    clearWallsAndWeights.onclick = () => {
        clear("wall", "weights");
    }

    const clearPath = document.getElementById('clear-path');
    clearPath.onclick = () => {
        clear("explored", "path");
    }
    
    //Weight Range
    document.getElementById('current-weight').innerHTML = document.getElementById('weight-range').value = 1;
    
    document.getElementById('weight-range').oninput = () => {
        document.getElementById('current-weight').innerHTML = document.getElementById('weight-range').value;
        
    }

}

export { addClicksToNavBar };