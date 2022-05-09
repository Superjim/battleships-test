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
    character: "c",
  },
  {
    name: "Battleship",
    length: 4,
    character: "b",
  },
  {
    name: "Destroyer",
    length: 3,
    character: "d",
  },
  {
    name: "Submarine",
    length: 3,
    character: "s",
  },
  {
    name: "Patrol Boat",
    length: 2,
    character: "p",
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
//let enemyGrid = createBoard(10);

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
//eg "-" becomes b in the array
function placeShip(coords, ship, orientation, grid, array) {
  let x = coords[0];
  let y = coords[1];
  size = ship.length;
  char = ship.character;
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

//returns x or y
function getRandomOrientation() {
  if (Math.round(Math.random()) === 1) {
    return "x";
  } else {
    return "y";
  }
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

//checks the board has a correct amount of ships placed
//this is a poor way of checking there is no overlap
//but i have spent 5 hours so far and i want to move on
//it turns the grid into a string then checks for the correct amount of characters
function countShips(array, character) {
  let toString = array.toString();
  return toString.split(character).length - 1;
}

function checkValidGrid(grid) {
  if (countShips(grid, "c") === 5) {
    if (countShips(grid, "b") === 4) {
      if (countShips(grid, "d") === 3) {
        if (countShips(grid, "s") === 3) {
          if (countShips(grid, "p") === 2) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

//checks the grid, if anything other than a "-" is present, returns true
//this shows that a ship is on the grid and is used for "client" side shot detection
function checkGrid(coords, grid) {
  let x = coords[0];
  let y = coords[1];
  if (grid[x][y] != "-") {
    return true;
  }
  return false;
}
// //get random coordinates
// //get random orientation
// //check ship fits
// //place ship on grid
function placeRandomShip(size, grid, ship) {
  let coords = getRandomPosition(size);
  let orientation = getRandomOrientation();
  if (checkShipFits(coords, orientation, ship, size) === true) {
    placeShip(coords, ship, orientation, grid);
  } else {
    placeRandomShip(size, grid, ship);
  }
}

function buildgame() {
  enemyGrid = createBoard(10);
  for (ship in ships) {
    placeRandomShip(10, enemyGrid, ships[ship]);
  }
}

running = true;

buildgame();

for (i = 0; i < 20; i++) {
  if (checkValidGrid(enemyGrid) === false) {
    buildgame();
  }
}
//testing
gridConsole(enemyGrid);
// gridConsole(heroGrid);

// //this doesnt work but i might need it later
// //checks that a ship does not overlap another ship
// function checkShipOverlap(coords, orientation, ship, grid) {
//   let x = coords[0];
//   let y = coords[1];
//   count = ship.length;
//   if (orientation === "x") {
//     for (i = 0; i < count; i++) {
//       if (grid[x + i][y] != "-") {
//         return true;
//       }
//     }
//   } else if (orientation === "y") {
//     for (i = 0; i < count; i++) {
//       if (grid[x][y + i] != "-") {
//         return true;
//       }
//     }
//   }
//   return false;
// }

//another broken function
//checks that a ship does not overlap another ship
// function checkShipOverlap(coords, orientation, ship, grid) {
//   let x = coords[0];
//   let y = coords[1];
//   count = ship.length;
//   let board = [];
//   let test = [];
//   if (orientation === "x") {
//     for (i = 0; i < count; i++) {
//       board.push(grid[x + i][y]);
//       test.push("-");
//     }
//     board = board.join("");
//     test = test.join("");
//     console.log(board);
//     console.log(test);
//     if (board === test) return true;
//     else return false;
//   } else if (orientation === "y") {
//     for (i = 0; i < count; i++) {
//       board.push(grid[x][y + i]);
//       test.push("-");
//     }
//     board = board.join("");
//     test = test.join("");
//     console.log(board);
//     console.log(test);
//     if (board === test) return true;
//     else return false;
//   }
// }
