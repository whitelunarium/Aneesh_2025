var wallImage = new Image();
wallImage.src = "brick.jpg";  // Update to use brick.jpg
wallImage.onload = function() {
  makeMaze();
};


function DrawMaze(Maze, ctx, cellsize, wallImage, endSprite = null) {
    var map = Maze.map();
    var cellSize = cellsize;
    var drawEndMethod;
    ctx.lineWidth = cellSize / 40;
  
    this.redrawMaze = function(size) {
      cellSize = size;
      ctx.lineWidth = cellSize / 50;
      drawMap();
      drawEndMethod();
    };
  
    function drawWall(x, y, direction) {
      // Draw the wall image at the correct position based on the direction
      ctx.save();
      if (direction === "n") {
        ctx.drawImage(wallImage, x * cellSize, y * cellSize, cellSize, cellSize / 8);
      } else if (direction === "s") {
        ctx.drawImage(wallImage, x * cellSize, (y + 1) * cellSize - cellSize / 8, cellSize, cellSize / 8);
      } else if (direction === "e") {
        ctx.drawImage(wallImage, (x + 1) * cellSize - cellSize / 8, y * cellSize, cellSize / 8, cellSize);
      } else if (direction === "w") {
        ctx.drawImage(wallImage, x * cellSize, y * cellSize, cellSize / 8, cellSize);
      }
      ctx.restore();
    }
  
    function drawCell(xCord, yCord, cell) {
      var x = xCord * cellSize;
      var y = yCord * cellSize;
  
      if (cell.n === false) drawWall(xCord, yCord, "n");
      if (cell.s === false) drawWall(xCord, yCord, "s");
      if (cell.e === false) drawWall(xCord, yCord, "e");
      if (cell.w === false) drawWall(xCord, yCord, "w");
    }
  
    function drawMap() {
      for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
          drawCell(x, y, map[x][y]);
        }
      }
    }
  
    function drawEndFlag() {
      var coord = Maze.endCoord();
      var gridSize = 4;
      var fraction = cellSize / gridSize - 2;
      var colorSwap = true;
      for (let y = 0; y < gridSize; y++) {
        if (gridSize % 2 == 0) {
          colorSwap = !colorSwap;
        }
        for (let x = 0; x < gridSize; x++) {
          ctx.beginPath();
          ctx.rect(
            coord.x * cellSize + x * fraction + 4.5,
            coord.y * cellSize + y * fraction + 4.5,
            fraction,
            fraction
          );
          ctx.fillStyle = colorSwap ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)";
          ctx.fill();
          colorSwap = !colorSwap;
        }
      }
    }
  
    function drawEndSprite() {
      var offsetLeft = cellSize / 50;
      var offsetRight = cellSize / 25;
      var coord = Maze.endCoord();
      ctx.drawImage(
        endSprite,
        2,
        2,
        endSprite.width,
        endSprite.height,
        coord.x * cellSize + offsetLeft,
        coord.y * cellSize + offsetLeft,
        cellSize - offsetRight,
        cellSize - offsetRight
      );
    }
  
    function clear() {
      var canvasSize = cellSize * map.length;
      ctx.clearRect(0, 0, canvasSize, canvasSize);
    }
  
    if (endSprite != null) {
      drawEndMethod = drawEndSprite;
    } else {
      drawEndMethod = drawEndFlag;
    }
    clear();
    drawMap();
    drawEndMethod();
  }
  