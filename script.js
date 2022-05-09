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

//Hasbro rules

// No. 	Class of ship 	Size
// 1 	Carrier 	5
// 2 	Battleship 	4
// 3 	Destroyer 	3
// 4 	Submarine 	3
// 5 	Patrol Boat 	2

const ships = [
  {
    name: "Carrier",
    length: 5,
  },
  {
    name: "Battleship",
    length: 4,
  },
  {
    name: "Destroyer",
    length: 3,
  },
  {
    name: "Submarine",
    length: 3,
  },
  {
    name: "Patrol Boat",
    length: 2,
  },
];

//gets the coords from the inner text of the table cell ("x,y") and calls checkGrid function
function getCoords() {
  splitCoords(this.innerText);
  if (checkGrid(splitCoords(this.innerText), enemyGrid) === true) {
    setHit(this.innerText);
  }
  setMiss(this.innerText);
}

//splits the inner text of the cell into an array [x][y] to be sent "server" side
function splitCoords(coords) {
  let split = coords.split(",");
  return split;
}

//sets the class of the cell stored in the table to miss (white)
function setMiss(coords) {
  document.getElementById(coords).classList.replace("empty", "miss");
}

//sets the class of the cell stored in the table to hit (red)
function setHit(coords) {
  document.getElementById(coords).classList.replace("empty", "hit");
}

//for testing
renderGrid(10);
let heroGrid = createBoard(10);
let enemyGrid = createBoard(10);

//creates an array of arrays to be used to store information on ship locations, hits and misses
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

//headings for console log prints
function createHeaders(size) {
  let result = "   ";
  for (let i = 0; i < size; i++) {
    result += i + "  ";
  }
  return result;
}

//place a ship on the grid by changing the character stored in the array
//eg "-" becomes E in the array
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

//gets a random position on the board via math random, returns it
function getRandomPosition(size) {
  let x = Math.floor(Math.random() * size);
  let y = Math.floor(Math.random() * size);
  const coords = [x, y];
  return coords;
}

//if ship will go out of bounds, return false
//if x cord is 8, and ship length is 5, and board size is 10, return false
function checkShipFits(coords, orientation, ship, boardsize) {
  if (orientation === "x") {
    if (coords[0] + ship.length > boardsize) {
      return false;
    } else {
      return true;
    }
  } else {
    if (coords[1] + ship.length > boardsize) {
      return false;
    } else {
      return true;
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

//testing
placeShip(1, 1, 3, "x", "H", heroGrid);

placeShip(6, 2, 5, "y", "E", enemyGrid);

gridConsole(enemyGrid, true);
gridConsole(heroGrid);
