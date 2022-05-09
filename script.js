let gridLocation = document.getElementById("gridContainer");

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
      td.id = "cell" + j;
      td.addEventListener("click", setMiss);
      td.classList.add("empty");
      // td.appendChild(document.createElement("div"));
      // td.innerText = i + "," + j;
      td.style.border = "1px solid black";
    }
  }
  gridLocation.appendChild(table);
}

function getCoords() {
  alert(this.innerText);
}

function setHit() {
  this.classList.remove("empty");
  this.classList.add("hit");
}

function setMiss() {
  this.classList.remove("empty");
  this.classList.add("miss");
}

renderGrid(10);
