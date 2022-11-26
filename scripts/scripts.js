


let gridContainer = document.querySelector(".grid-container");


for(let i = 0; i < 16; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    gridContainer.append(rowDiv);

    for(let j = 0; j < 16; j++) {
        let colDiv = document.createElement("div");
        colDiv.classList.add("column");
        rowDiv.append(colDiv);
    }
}