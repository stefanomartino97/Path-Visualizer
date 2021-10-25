const parameters = {
    algorithm: 'Dijkstra',
    speed: 'medium'
};

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
    
}

export { addClicksToNavBar };