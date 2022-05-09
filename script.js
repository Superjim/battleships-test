class gameBoard {
  constructor(size = 10) {
    this.size = size;
    const grid = new Array(size * size);
    grid.fill("0");
    return grid;
  }
}

for object in gameBoard {
    square = document.createElement("div");
    square.innerText = "x";

}