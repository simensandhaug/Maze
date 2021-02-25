class Node {
    constructor(rowNum, colNum, parentGrid, parentSize) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        this.walls = {
            topWall: true,
            rightWall: true,
            bottomWall: true,
            leftWall: true,
        };
    }
    checkNeighbours = () => {
        let grid = this.parentGrid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbours = [];

        let top = row !== 0 ? grid[row - 1][col] : undefined;
        let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
        let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
        let left = col !== 0 ? grid[row][col - 1] : undefined;

        if (top && !top.visited) neighbours.push(top);
        if (right && !right.visited) neighbours.push(right);
        if (bottom && !bottom.visited) neighbours.push(bottom);
        if (left && !left.visited) neighbours.push(left);

        if (neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return undefined;
        }
    }
    drawTopWall = (x, y, size, columns, rows) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / columns, y);
        ctx.stroke();
    }
    drawRightWall = (x, y, size, columns, rows) => {
        ctx.beginPath();
        ctx.moveTo(x + size / columns, y);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
    }
    drawBottomWall = (x, y, size, columns, rows) => {
        ctx.beginPath();
        ctx.moveTo(x, y + size / rows);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
    }
    drawLeftWall = (x, y, size, columns, rows) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size / rows);
        ctx.stroke();
    }
    removeWalls = (node1, node2) => {
        let x = node1.colNum - node2.colNum;
        if (x == 1) {
            node1.walls.leftWall = false;
            node2.walls.rightWall = false;
        } else if (x == -1) {
            node1.walls.rightWall = false;
            node2.walls.leftWall = false;
        }
        let y = node1.rowNum - node2.rowNum;
        if (y == 1) {
            node1.walls.topWall = false;
            node2.walls.bottomWall = false;
        } else if (y == -1) {
            node1.walls.bottomWall = false;
            node2.walls.topWall = false;
        }
    }
    show = (size, rows, columns) => {
        let x = this.colNum * size / columns;
        let y = this.rowNum * size / rows;
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 2;
        if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
        if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
        if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
        if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
        if (this.visited) {
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
    }
}