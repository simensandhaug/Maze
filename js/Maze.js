class Maze {
    constructor(size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
    }

    setup = () => {
        for (let r = 0; r < this.rows; r++) {
            this.grid.push(new Array);
            for (let c = 0; c < this.columns; c++) {
                this.grid[r].push(new Node(r, c, this.grid, this.size));
            }
        }
        game.current = this.grid[0][0];
    }

    draw = () => {
        canvas.width = this.size;
        canvas.height = this.size;
        canvas.style.background = '#000000';
        game.current.visited = true;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }
        let next = game.current.checkNeighbours();
        if (next) {
            next.visited = true;
            this.stack.push(game.current);
            game.current.removeWalls(game.current, next);
            game.current = next;
        } else if (this.stack.length > 0) {
            let node = this.stack.pop();
            game.current = node;
        }
        if (this.stack.length == 0) {
            game.startGame();
            return;
        }
        if(game.animateMaze) {
            window.requestAnimationFrame(() => {
                this.draw();
            });
        } else this.draw();
    }
}