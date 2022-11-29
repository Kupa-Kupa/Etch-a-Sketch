/* sidebar */
let sidebar = document.querySelector(".side-bar");



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

    // let column = document.querySelector(".column");

    // column.addEventListener("mouseenter", colorChange);

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

    // want it to appear between the two sidebars so use .after or before
    // main.append(gridContainer);

    sidebar.after(gridContainer);
}



let oldSchool11Button = document.querySelector("#old-school-11");

let oldSchool22Button = document.querySelector("#old-school-22");

let oldSchool44Button = document.querySelector("#old-school-44");

oldSchool11Button.addEventListener("click", oldSchoolResize);

oldSchool22Button.addEventListener("click", oldSchoolResize);

oldSchool44Button.addEventListener("click", oldSchoolResize);


function oldSchoolResize(event) {
    // should split this out into a function that take rows / cols
    let startTime = Date.now();
    deleteGrid();
    gridContainer.classList.add("old-school-grid-container");

    let rows;
    let cols;
    console.log(event.target.id.indexOf("11"));

    if(event.target.id.indexOf("11") !== -1) {
        rows = 8;
        cols = 11;
    } else if (event.target.id.indexOf("22") !== -1) {
        rows = 16;
        cols = 22;
    } else if (event.target.id.indexOf("44") !== -1) {
        rows = 32;
        cols = 44;
    }

    for(let i = 0; i < rows; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row", `row-${i+1}`);
        gridContainer.append(rowDiv);
    
        for(let j = 0; j < cols; j++) {
            let colDiv = document.createElement("div");
            colDiv.classList.add("column", `col-${j+1}`, "square");
            rowDiv.append(colDiv);
        }
    }

    console.log(`${Date.now() - startTime}ms`);
}




let gridToggleButton = document.querySelector("#toggle-grid-lines");

gridToggleButton.addEventListener("click", toggleGridLines);

function toggleGridLines() {
    gridContainer.classList.toggle("grid-toggle");

    Array.from(gridContainer.children).forEach(child => {
        child.classList.toggle("grid-toggle");
    });
}



/*--- Colouring ---*/
 let row = document.querySelector(".row");
 let column = document.querySelector(".column");

 // mouseover triggers whenever mouse enters any child of gridContainer
 gridContainer.addEventListener("mouseover", colorChange);


 function colorChange(event) {
    if(event.target.classList.contains('column')) {
        console.log("column");
        event.target.style.backgroundColor = "red";
    }
    // event.target.style.backgroundColor = "red";
    // console.log(event.target)
    console.log('enter');
 }





