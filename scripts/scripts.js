/*--- Global Variables ---*/
let colour = `rgb(0,0,0)`;

let rainbow = false;

let darken = false;

let column;


/* sidebar */
let sidebar = document.querySelector(".side-bar");

let blackButton = document.querySelector("button#black");

let eraserButton = document.querySelector("button#eraser");

let colourButton = document.querySelector("button#colour");

let rainbowButton = document.querySelector("button#rainbow");

let darkenButton = document.querySelector("button#darken");

let lightenButton = document.querySelector("button#lighten");


/*--- Button Colours ---*/

blackButton.addEventListener("click", () => {
    colour = `rgb(0,0,0)`;
    rainbow = false;
});

eraserButton.addEventListener("click", () => {
    colour = `rgb(255,255,255)`;
    rainbow = false;
});

colourButton.addEventListener("click", () => {
    colour = `rgb(255,255,255)`;
    rainbow = false;
});

rainbowButton.addEventListener("click", () => {
    colour = 'rainbow';
    rainbow = true;
    // console.log(randomRGB());
});


/*  to lighten and darken I can:
    1) convert rgb to hsl which seems complex
    2) stack a grid on top of grid, change the colour of the base grid 
    and then change opacity of the top grid so the base grid colour comes 
    through
    3) convert to hex?
*/
darkenButton.addEventListener("click", () => {
    colour = `rgb(255,255,255)`;
    rainbow = false;
    darken = true;
});

lightenButton.addEventListener("click", () => {
    colour = `rgb(0,0,0)`;
    rainbow = false;
});


function randomRGB(){
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}


function getColour(){
    if (colour === 'rainbow') {
        colour = randomRGB();
        return colour;
    } else {
        return colour;
    }
}







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

// can comment out
column = document.querySelector(".column");

/*--- disable right click on grid ---*/
// gridContainer.addEventListener("contextmenu", (event) => {
//     event.preventDefault();
// });


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

    // can comment out
    column = document.querySelector(".column");

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

    // add back event listener for colour change
    gridContainer.addEventListener("mouseover", colorChange);
    gridContainer.addEventListener("mousedown", colorChange);
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
let mouseDown = false;
document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);

// mouseout triggers whenever mouse exits any child of gridContainer
// mouseover triggers whenever mouse enters any child of gridContainer
gridContainer.addEventListener("mouseover", colorChange);
gridContainer.addEventListener("mousedown", colorChange);


function colorChange(event) {

    // rainbow
    if(event.target.classList.contains('column') && mouseDown == true && event.type === `mouseover` && rainbow === true) {
        colour = randomRGB();
        // event.target.style.backgroundColor = colour;
        event.target.setAttribute('style', `background-color: ${colour};`);
    } else if (event.target.classList.contains('column') && event.type === `mousedown` && rainbow === true) {
        event.preventDefault();
        colour = randomRGB();
        // event.target.style.backgroundColor = colour; 
        event.target.setAttribute('style', `background-color: ${colour};`);
    }



    // darken
    /* having big issues trying to get the background colour of the square 
    */
    if(event.target.classList.contains('column') && mouseDown == true && event.type === `mouseover` && darken === true) {
        console.log(event.target.style.backgroundColor);
        colour = darkenColour(rgbToHsl(event.target.style.backgroundColor));
        console.log(colour);
        event.target.style.backgroundColor = colour; 
    } else if (event.target.classList.contains('column') && event.type === `mousedown` && darken === true) {
        event.preventDefault();
        console.log(event.target);

        // gives correct answer of white rgb
        console.log(getComputedStyle(event.target).getPropertyValue('background-color'));

        // logs empty string
        console.log(event.target.style.backgroundColor);

        // doesn't work
        // colour = darkenColour(rgbToHsl(event.target.style.backgroundColor));
        
        
        colour = darkenColour(rgbToHsl(getComputedStyle(event.target).getPropertyValue('background-color')));



        console.log(colour);
        event.target.style.backgroundColor = colour;
        console.log(event.target.style.backgroundColor);
    }





    
    // change tile background on click and move
    if(event.target.classList.contains('column') && mouseDown == true) {
        event.target.style.backgroundColor = colour;      
    }
    
    // change single tile background on click
    if(event.target.classList.contains('column') && event.type === `mousedown`) {
        // prevent draggable functionality ("grabbing")
        event.preventDefault();
        event.target.style.backgroundColor = colour; 
    }
    // console.log(event.target)
    // console.log('enter');

    

    
}




function rgbToHsl(colour){
    // regex: match any single character that's not 0-9 , or .
    console.log(typeof(colour));
    let rgb = colour.replace(/[^\d,.]/g, '').split(',');
    console.log(rgb);
    let r = parseInt(rgb[0]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2]);
    
    let newR = r / 255;
    let newG = g / 255;
    let newB = b / 255;

    let min = Math.min(newR, newB, newG);
    console.log(min);
    let max = Math.max(newR, newB, newG);
    console.log(max);

    let delta = max - min

    let l = (max + min) / 2;
    console.log(`l:${l}`);

    let h;
    let s;

    if (delta === 0) {
        s = 0;
        h = 0;
    } else {
        s = (delta / (1 - Math.abs(2 * l - 1)))
        console.log(`s:${s}`);

        if(max === newR) {
            h = 60 * (((newG - newB) / delta));

            if(h < 0) {
                h = h + 360;
            }

            console.log(`h:${h}`);
        } else if (max === newG) {
            h = 60 * (((newB - newR) / delta) + 2);
            console.log(`h:${h}`);
        } else if (max === newB) {
            h = 60 * (((newR - newG) / delta) + 4);
            console.log(`h:${h}`);
        }
    }

    console.log(`hsl(${h},${s},${l})`);

    return `hsl(${h},${s},${l})`;
}

// rgbToHsl(`rgb(0,200,0)`);


function darkenColour(hsl) {
    let hslArray = hsl.replace(/[^\d,.]/g, '').split(',');
    console.log(hslArray);
    console.log(hslArray[2]);
    let darkenL = hslArray[2] - 0.1;
    let darkHsl = `hsl(${hslArray[0]}, ${hslArray[1] * 100}%, ${darkenL * 100}%)`;
    return darkHsl;
}
