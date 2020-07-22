// console.log(`In snake loop `);
// highscore = 0;

function init() {
    // let hscr = document.getElementById(`hscores`);
    // hscr.innerHTML = `${highscore}`
    canvas = document.getElementById(`myCanvas`);
    W = canvas.width = 438;
    H = canvas.height = 300;
    pen = canvas.getContext(`2d`);
    cs = 34;
    game_over = false;
    // console.log(`in init`);
    score = 0;
    //  Creating an apple-image  object
    food_img = new Image();
    food_img.src = "apple.png";

    snake_img = new Image();
    snake_img.src = "snake.png";

    Food = getRandomFood();
    snake = {
        init_len: 4,
        color: "blue",
        cell: [],
        direction: "right",

        createSnake: function() {
            for (let i = this.init_len; i > 0; i--) {
                this.cell.push({ x: i, y: 0 });
                // console.log(this.cell[i]);
            }
        },
        drawSnake: function() {

            for (let i = 0; i < (this.cell.length) - 1; i++) {
                pen.fillStyle = snake.color;
                pen.fillRect((this.cell[i].x) * cs, (this.cell[i].y) * cs, cs - 3, cs - 3);
            }
            // pen.drawImage(snake_img, this.cell[this.cell.length].x * cs, this.cell[this.cell.length].y * cs, cs - 2, cs - 2);
        },
        updateSnake: function() {
            // console.log(`Snake is updating`);
            // pen.clearRect(0, 0, W, H);
            headX = this.cell[0].x;
            headY = this.cell[0].y;

            let X;
            let Y;
            if (this.direction == "right") {
                X = headX + 1;
                Y = headY;

            } else if (this.direction == "left") {
                X = headX - 1;
                Y = headY;
            } else if (this.direction == "up") {
                X = headX;
                Y = headY - 1;
            } else if (this.direction == "down") {
                X = headX;
                Y = headY + 1;
            }
            if (headX == food.x && headY == food.y) {
                // console.log('Fruit is Eaten');
                // this.cell.unshift({ x: X, y: Y + 1 });
                Food = getRandomFood();
                score++;

            } else {
                this.cell.pop();
                // console.log(`Not Eaten`);
            }
            this.cell.unshift({ x: X, y: Y });


            let lastX = Math.floor(W / cs);
            let lastY = Math.floor(H / cs);

            if (this.cell[0].y < 0 || this.cell[0].x < 0 || this.cell[0].y > lastY || this.cell[0].x > lastX) {
                game_over = true;
            }
        }
    }

    snake.createSnake();

    function keypress(e) {
        if (e.key == "ArrowDown") {
            if (snake.direction != "up") {
                snake.direction = "down";
            }
        } else if (e.key == "ArrowUp") {
            if (snake.direction != "down") {
                snake.direction = "up";
            }
        } else if (e.key == "ArrowLeft") {
            if (snake.direction != "right") {
                snake.direction = "left";
            }
        } else if (e.key == "ArrowRight") {
            if (snake.direction != "left") {
                snake.direction = "right";
            }
        }
        // console.log(snake.direction);
    }

    document.addEventListener(`keydown`, keypress);
}

colChange = function() {
    let bg = document.querySelector('body');
    bg.style.background = `linear-gradient(rgb(${score*7+15},${score*6},${score*2+40}),rgb(${score*4},${score*5},${score*6})`;
    // console.log(`rbg(${score},${score},${score}),rbg(${255-score},${255-score},${255-score})`);
}

function draw() {
    localStorage.getItem(`hscr`);
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    // pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs - 2, cs - 2);

    pen.fillStyle = "Black";
    pen.font = "40px Roboto";
    // pen.fillText(score, 30, 50);
    let scr = document.getElementById(`scores`);
    scr.innerHTML = `${score}`;
    colChange();
    // localStorage.getItem(`hscr`);
    // localStorage.setItem(`hscr`, highscore);
    // let hscr = localStorage.getItem(`hscr`);
    // let hscr = document.getElementById(`hscores`);
    // hscr.innerHTML = `${highscore}`
    // showHighscore();
}

// showHighScore = function() {
// console.log(hscr);
// }

function getRandomFood() {
    let foodX = Math.round(Math.random() * (W - cs) / cs);
    let foodY = Math.round(Math.random() * (H - cs) / cs);
    food = {
            x: foodX,
            y: foodY,
            color: "red",
            // printFood: function() {
            //     pen.fillStyle = this.color;
            //     pen.fillRect(this.x * cs, this.y * cs, cs - 2, cs - 2);
            // }
        }
        // food.printFood();
    return food;
}

function update() {
    snake.updateSnake();

}

function gameloop() {
    if (game_over == true) {
        clearInterval(f);
        alert(`GAME OVER`);
        let playagain = document.getElementById('butt2');
        playagain.addEventListener('click', function() {
            location.reload();
        });
        // again = prompt(`Want to start again`);
    }
    draw();
    update();
}

// console.log(`hi`);
init();
let strGame = document.getElementById('butt');
strGame.addEventListener('click', function() {
    // gameloop();
    f = setInterval(gameloop, 150);
})