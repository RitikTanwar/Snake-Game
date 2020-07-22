// Html Canvas

// canvas = document.getElementById('myCanvas');
// canvas.width = 500;
// canvas.height = 500;

// let pen = canvas.getContext('2d');
// pen.fillStyle = "Blue";
// pen.strokeStyle = "Blue";
// pen.fillRect(20, 20, 30, 30);
// pen.arc(55, 35, 15, 0, 2 * Math.PI);
// pen.stroke();
// pen.fill();
// console.log(pen.fillStyle);



// GameLoop

function init() {
    // console.log(`in init`);
    canvas = document.getElementById(`myCanvas`);
    W = canvas.width = 1500;
    H = canvas.height = 1495;


    game_loop = false;

    pen = canvas.getContext(`2d`);
    rect = {
        x: 20,
        y: 20,
        wd: 30,
        ht: 30,
        speed: 10
    };
    X = rect.x;
    Y = rect.Y;
}

function draw() {
    // console.log(`in draw`);
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = "Blue";
    pen.fillRect(rect.x, rect.y, rect.wd, rect.ht);
}

function update() {
    // console.log(`in update`);
    rect.x += rect.speed;
    if (rect.x > W - rect.wd - X || rect.x < X) {
        rect.speed *= -1;
    }
}

function GameLoop() {
    // console.log(`in gameloop`);
    if (game_loop == true) {
        clearInterval(f);
        // init();
    }
    draw();
    update();
}

init();
// GameLoop();

let f = setInterval(GameLoop, 50);