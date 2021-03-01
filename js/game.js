const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const timeEl = document.getElementById("time");
const levelEl = document.getElementById("level");
const containerEl = document.querySelector(".flex-container");

class Game {
    constructor(startSize, startColumns, startRows, lastLevel, increment, animateMaze) {
        this.size = startSize;
        this.columns = startColumns;
        this.rows = startRows;
        this.current;
        this.maze;
        this.level = 1;
        this.goal;
        this.player;
        this.time = 0;
        this.increment = increment;
        this.lastLevel = lastLevel;
        this.animateMaze = animateMaze;
    }
    initializeGame = () => {
        this.maze = new Maze(this.size, this.columns, this.rows);
        this.maze.setup();
        this.maze.draw();
    }
    startGame = () => {
        this.player = new Player(this.maze.grid[0][0]);
        this.player.draw();
        this.goal = new Goal(this.maze.grid[this.maze.columns - 1][this.maze.rows - 1]);
        this.goal.draw();

        document.addEventListener("keypress", this.playerMove);
    }
    playerMove = e => {
        if (e.key == "w") this.player.up();
        if (e.key == "d") this.player.right();
        if (e.key == "s") this.player.down();
        if (e.key == "a") this.player.left();
    }
    gameOver = () => {
        containerEl.innerHTML = `<div><h1>Gameover</h1></div>`
        containerEl.innerHTML += `<h2>Time to finish level ${this.lastLevel}:</h2><br><h2>${game.time/100} seconds</h2>`;
        containerEl.innerHTML += `<button onclick="location.reload()">Play Again</button>`
    }
}
let size = 750;
let lastLevel = 5;
let increment = 2;
let gridSize = 5;
let animate = true;
let game = new Game(size, gridSize, gridSize, lastLevel, increment, animate);
game.initializeGame();
setInterval(() => {
    game.time++;
    timeEl.innerHTML = `Time: ${game.time/100}`;
}, 10);