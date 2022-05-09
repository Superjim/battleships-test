let gridLocation = document.getElementById("gridContainer");

//builds a table for the player to communicate their moves
//("client side")
function renderGrid(size) {
  const body = document.body,
    table = document.createElement("table");
  table.id = "table";
  table.style.width = (size * 50).toString() + "px";
  table.style.height = (size * 50).toString() + "px";
  table.style.border = "1px solid black";

  for (let i = 0; i < size; i++) {
    const tr = table.insertRow();
    tr.id = "row" + i;
    for (let j = 0; j < size; j++) {
      const td = tr.insertCell();
      td.id = i + "," + j;
      td.classList.add("empty");
      td.innerText = i + "," + j;
      td.style.border = "1px solid black";
      td.addEventListener("click", getCoords);
    }
  }
  //return table;
  gridLocation.appendChild(table);
}

function checkHit() {
  if (this.containsShip) {
    setHit(this);
  } else {
    setMiss(this);
  }
}

function getCoords() {
  splitCoords(this.innerText);
  if (checkGrid(splitCoords(this.innerText), enemyGrid) === true) {
    setHit(this.innerText);
  } else setMiss(this.innerText);
}

function splitCoords(coords) {
  let split = coords.split(",");
  return split;
}

function setMiss(coords) {
  document.getElementById(coords).classList.replace("empty", "miss");
}

function setHit() {
  document.getElementById(coords).classList.replace("empty", "hit");
}

renderGrid(10);

let heroGrid = createBoard(10);
let enemyGrid = createBoard(10);

let myShips = 3;
let enemyShips = 3;

function createBoard(size) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = "-";
      grid.id = i + "" + j;
    }
  }
  return grid;
}

//prints grid to console, useful for development
function gridConsole(grid, isEnemy = false) {
  const headers = createHeaders(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    let rowStr = i + "  ";
    for (let cell of grid[i]) {
      if (isEnemy && cell == "0") {
        rowStr += "-  ";
      } else {
        rowStr += cell + "  ";
      }
    }
    console.log(rowStr);
  }
}

function createHeaders(size) {
  let result = "   ";
  for (let i = 0; i < size; i++) {
    result += i + "  ";
  }
  return result;
}

function placeShip(x, y, size, orientation, char, grid) {
  if (orientation === "x") {
    for (i = 0; i < size; i++) {
      grid[y][x + i] = char;
    }
  } else {
    for (i = 0; i < size; i++) {
      grid[y + i][x] = char;
    }
  }
}

//checks the grid, if anything other than a "-" is present, returns true
//this shows that a ship is on the grid
function checkGrid(coords, grid) {
  let x = coords[0];
  let y = coords[1];
  if (grid[x][y] != "-") {
    return true;
  }
  return false;
}

placeShip(1, 1, 3, "x", "H", heroGrid);

placeShip(6, 2, 5, "y", "E", enemyGrid);

gridConsole(enemyGrid, true);
gridConsole(heroGrid);
