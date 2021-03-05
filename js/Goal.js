class Goal {
    constructor(node) {
        this.node = node;
        this.rowNum = node.rowNum;
        this.colNum = node.colNum;
    }
    draw = () => {
        ctx.fillStyle = 'red';
        let x = this.node.colNum * game.maze.size / game.maze.columns;
        let y = this.node.rowNum * game.maze.size / game.maze.rows;
        ctx.fillRect(x + 5, y + 5, game.maze.size / game.maze.columns - 10, game.maze.size / game.maze.rows - 10);
        ctx.drawImage(game.jonnernIMG, x + 5, y + 5, game.maze.size / game.maze.columns - 10, game.maze.size / game.maze.rows - 10)
    }
}