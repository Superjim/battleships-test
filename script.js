let gridLocation = document.getElementById("gridContainer");

//builds a table for the player to communicate their moves
function renderGrid(size) {
  const body = document.body,
    table = document.createElement("table");
  table.id = "table";
  table.style.width = (size * 50).toString() + "px";
  table.style.height = (size * 50).toString() + "px";
  table.style.border = "1px solid black";

  for (let i = 1; i < size + 1; i++) {
    const tr = table.insertRow();
    tr.id = "row" + i;
    for (let j = 1; j < size + 1; j++) {
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
  setMiss(this.innerText);
}

function setMiss(coords) {
  document.getElementById(coords).classList.replace("empty", "miss");
}

function setHit() {
  document.getElementById(coords).classList.replace("empty", "hit");
}

renderGrid(10);
