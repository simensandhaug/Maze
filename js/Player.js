class Player {
    constructor(startNode) {
        this.node = startNode;
        this.colNum = this.node.colNum;
        this.rowNum = this.node.rowNum;
        this.x = this.colNum * game.maze.size / game.maze.columns;
        this.y = this.rowNum * game.maze.size / game.maze.rows;
    }
    updatePos = () => {
        ctx.clearRect(this.x + 1, this.y + 1, game.maze.size / game.maze.columns - 2, game.maze.size / game.maze.rows - 2);
        this.colNum = this.node.colNum;
        this.rowNum = this.node.rowNum;
        this.x = this.colNum * game.maze.size / game.maze.columns;
        this.y = this.rowNum * game.maze.size / game.maze.rows;
        this.draw();
        if (this.rowNum == game.goal.rowNum && this.colNum == game.goal.colNum) {
            document.removeEventListener("keypress", game.playerMove);
            game.columns += game.increment;
            game.rows += game.increment;
            if(game.level == game.lastLevel) {
                game.gameOver();
                return;
            }
            game.level++;
            levelEl.innerHTML = `Level: ${game.level}`;
            game.initializeGame();
        }
    }
    draw = () => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x + 5, this.y + 5, game.maze.size / game.maze.columns - 10, game.maze.size / game.maze.rows - 10);
    }
    up = () => {
        try {
            this.node = game.maze.grid[this.rowNum - 1][this.colNum];

            if (!this.node.walls.bottomWall) {
                this.updatePos();
                if (this.node.walls.leftWall && this.node.walls.rightWall) this.up();
            } else this.node = game.maze.grid[this.rowNum][this.colNum];
        } catch {
            console.log("Error: Du kan ikke gå utenfor banen")
        }
    }
    right = () => {
        try {
            this.node = game.maze.grid[this.rowNum][this.colNum + 1];

            if (!this.node.walls.leftWall) {
                this.updatePos();
                if (this.node.walls.bottomWall && this.node.walls.topWall) this.right();
            } else this.node = game.maze.grid[this.rowNum][this.colNum];
        } catch {
            console.log("Error: Du kan ikke gå utenfor banen")
        }
    }
    down = () => {
        try {
            this.node = game.maze.grid[this.rowNum + 1][this.colNum];

            if (!this.node.walls.topWall) {
                this.updatePos();
                if (this.node.walls.leftWall && this.node.walls.rightWall) this.down();
            } else this.node = game.maze.grid[this.rowNum][this.colNum];
        } catch {
            console.log("Error: Du kan ikke gå utenfor banen")
        }
    }
    left = () => {
        try {
            this.node = game.maze.grid[this.rowNum][this.colNum - 1];

            if (!this.node.walls.rightWall) {
                this.updatePos();
                if (this.node.walls.topWall && this.node.walls.bottomWall) this.left();
            } else this.node = game.maze.grid[this.rowNum][this.colNum];
        } catch {
            console.log("Error: Du kan ikke gå utenfor banen")
        }
    }
}