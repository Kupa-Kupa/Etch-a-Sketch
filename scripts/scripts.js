
/* Grid */

let main = document.querySelector("main");

let gridContainer = document.querySelector(".grid-container");


for(let i = 0; i < 16; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row", `row-${i+1}`);
    gridContainer.append(rowDiv);

    for(let j = 0; j < 16; j++) {
        let colDiv = document.createElement("div");
        colDiv.classList.add("column", `col-${j+1}`, "square");
        rowDiv.append(colDiv);
    }
}


/* Slider */

let sliderValue = document.querySelector("#slider-value");

let sliderValueDisplay = document.querySelector("#slider-value-display");


sliderValue.addEventListener("input", changeSliderValueDisplay);

function changeSliderValueDisplay(event) {
    // console.log(event)
    sliderValueDisplay.textContent = event.target.value;
    return;
}



/* Resize grid */

let resize = document.querySelector("#resize");

resize.addEventListener("click", resizeGrid);

function resizeGrid(){
    let startTime = Date.now();
    // clearGrid();
    deleteGrid();

    let rows = parseInt(sliderValueDisplay.textContent);
    console.log(rows);

    for(let i = 0; i < rows; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row", `row-${i+1}`);
        gridContainer.append(rowDiv);
    
        for(let j = 0; j < rows; j++) {
            let colDiv = document.createElement("div");
            colDiv.classList.add("column", `col-${j+1}`, "square");
            rowDiv.append(colDiv);
        }
    }

    console.log(`${Date.now() - startTime}ms`);
}


function clearGrid() {
    Array.from(gridContainer.children).forEach(child => {
        gridContainer.removeChild(child);
    });
}


function deleteGrid() {
    main.removeChild(gridContainer);
    gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    main.append(gridContainer);
}