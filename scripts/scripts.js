/*--- Global Variables ---*/
let colour = `rgb(0,0,0)`;

let rainbow = false;

let darken = false;

let lighten = false;

let column;

let step;


/* sidebar */
let sidebar = document.querySelector(".side-bar");

let blackButton = document.querySelector("button#black");

let eraserButton = document.querySelector("button#eraser");

let colourButton = document.querySelector("button#colour");

let rainbowButton = document.querySelector("button#rainbow");

let darkenButton = document.querySelector("button#darken");

let lightenButton = document.querySelector("button#lighten");

let colorPicker = document.querySelector("#color-picker");


/*--- Button Colours ---*/

blackButton.addEventListener("click", () => {
    colour = `rgb(0,0,0)`;
    rainbow = false;
    darken = false;
    lighten = false;
});

eraserButton.addEventListener("click", () => {
    colour = `rgb(255,255,255)`;
    rainbow = false;
    darken = false;
    lighten = false;
});

colorPicker.addEventListener("change", () => {
    colour = colorPicker.value;
    rainbow = false;
    darken = false;
    lighten = false;
});

colourButton.addEventListener("click", () => {
    colour = colorPicker.value;
    rainbow = false;
    darken = false;
    lighten = false;
});

rainbowButton.addEventListener("click", () => {
    colour = 'rainbow';
    rainbow = true;
    darken = false;
    lighten = false;
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
    lighten = false;
});

lightenButton.addEventListener("click", () => {
    colour = `rgb(0,0,0)`;
    rainbow = false;
    darken = false;
    lighten = true;
});


function randomRGB(){
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}

// dont need
// function getColour(){
//     if (colour === 'rainbow') {
//         colour = randomRGB();
//         return colour;
//     } else {
//         return colour;
//     }
// }





/* Grid */

let main = document.querySelector("main");

let gridContainer = document.querySelector(".grid-container");

let etchContainer = document.querySelector(".etch-container");


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

    // square resize
    gridContainer.classList.add("square-grid");

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
    // main.removeChild(gridContainer);
    etchContainer.removeChild(gridContainer);


    gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    // want it to appear between the two sidebars so use .after or before
    // main.append(gridContainer);

    // sidebar.after(gridContainer);

    // created a container for the etch so can just use append again
    etchContainer.append(gridContainer);

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
        event.target.removeAttribute('data-lighten');
        event.target.removeAttribute('data-darken');

        colour = randomRGB();
        // event.target.style.backgroundColor = colour;
        event.target.setAttribute('style', `background-color: ${colour};`);

        return;
    } else if (event.target.classList.contains('column') && event.type === `mousedown` && rainbow === true) {
        event.preventDefault();

        event.target.removeAttribute('data-lighten');
        event.target.removeAttribute('data-darken');

        colour = randomRGB();
        // event.target.style.backgroundColor = colour; 
        event.target.setAttribute('style', `background-color: ${colour};`);

        return;
    }



    // darken
    /* having big issues trying to get the background colour of the square 
    */
    if(event.target.classList.contains('column') && mouseDown == true && event.type === `mouseover` && darken === true) {
        // console.log(event.target.style.backgroundColor);
        // colour = darkenColour(rgbToHsl(event.target.style.backgroundColor));

        /* getComputedStyle() returns an object containing the values of all CSS properties 
        of an element, after applying active stylesheets and resolving any basic computation 
        those values may contain.
        HTMLElement.style only returns the inline style of an element in the form of a CSSStyleDeclaration object
        */
        // colour = darkenColour(rgbToHsl(getComputedStyle(event.target).getPropertyValue('background-color')));

        // 10 steps to black
        colour = tenStepsToBlack(event.target);

        console.log(colour);
        event.target.style.backgroundColor = colour;

        return;
    } else if (event.target.classList.contains('column') && event.type === `mousedown` && darken === true) {
        event.preventDefault();
        // console.log(event.target);

        // gives correct answer of white rgb
        // console.log(getComputedStyle(event.target).getPropertyValue('background-color'));

        // logs empty string
        // console.log(event.target.style.backgroundColor);

        // doesn't work
        // colour = darkenColour(rgbToHsl(event.target.style.backgroundColor));
        
        // colour = darkenColour(rgbToHsl(getComputedStyle(event.target).getPropertyValue('background-color')));

        // 10 steps to black
        colour = tenStepsToBlack(event.target);

        console.log(colour);
        event.target.style.backgroundColor = colour;
        // console.log(event.target.style.backgroundColor);

        return;
    }




    // lighten
    if(event.target.classList.contains('column') && mouseDown == true && event.type === `mouseover` && lighten === true) {
        // colour = lightenColour(rgbToHsl(getComputedStyle(event.target).getPropertyValue('background-color')));

        // console.log(colour);

        colour = tenStepsToWhite(event.target);

        event.target.style.backgroundColor = colour;

        return;

    } else if (event.target.classList.contains('column') && event.type === `mousedown` && lighten === true) {
        event.preventDefault();
        
        // colour = lightenColour(rgbToHsl(getComputedStyle(event.target).getPropertyValue('background-color')));

        // colour = newLightenColour(getComputedStyle(event.target).getPropertyValue('background-color'));

        colour = tenStepsToWhite(event.target);

        // console.log(colour);

        event.target.style.backgroundColor = colour;

        return;
    }





    
    // change tile background on click and move
    if(event.target.classList.contains('column') && mouseDown == true) {
        event.target.removeAttribute('data-lighten');
        event.target.removeAttribute('data-darken');

        event.target.style.backgroundColor = colour;
        
        return;
    }
    
    // change single tile background on click
    if(event.target.classList.contains('column') && event.type === `mousedown`) {
        // prevent draggable functionality ("grabbing")
        event.preventDefault();

        event.target.removeAttribute('data-lighten');
        event.target.removeAttribute('data-darken');

        event.target.style.backgroundColor = colour;

        return;
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
    let darkenL = parseFloat(hslArray[2])- 0.1;
    let darkHsl = `hsl(${hslArray[0]}, ${hslArray[1] * 100}%, ${darkenL * 100}%)`;
    return darkHsl;
}



function lightenColour(hsl) {
    let hslArray = hsl.replace(/[^\d,.]/g, '').split(',');
    console.log(hslArray);
    console.log(hslArray[2]);
    let lightenL = Number(hslArray[2]) + 0.1;
    let lightHsl = `hsl(${hslArray[0]}, ${hslArray[1] * 100}%, ${lightenL * 100}%)`;
    return lightHsl;
}


// could have just added 26 to rgb values instead of doing the hsl conversion...
function newLightenColour(rgb) {
    let RGBArray = rgb.replace(/[^\d,.]/g, '').split(',');
    console.log(RGBArray);

    RGBArray.forEach((item, index) => {
        console.log(item);
        console.log(index);
        RGBArray[index] = parseInt(item) + 26;
        console.log(item);
    });

    console.log(RGBArray);

    let lightRGB = `rgb(${RGBArray[0]}, ${RGBArray[1]}, ${RGBArray[2]})`;
    return lightRGB;
}


function tenStepsToWhite(targetElement) {
    
    let rgb = getComputedStyle(targetElement).getPropertyValue('background-color');
    
    let RGBArray = rgb.replace(/[^\d,.]/g, '').split(',');

    console.log(RGBArray);

    if (!targetElement.hasAttribute('data-lighten')) {
        targetElement.removeAttribute('data-darken');
        targetElement.setAttribute('data-lighten', 0);
        step = targetElement.getAttribute('data-lighten');
        console.log(`Set data-lighten: ${step}`);
    } else if (targetElement.getAttribute('data-lighten') < 10) {
        step = parseInt(targetElement.getAttribute('data-lighten')) + 1;
        console.log(step);
        targetElement.setAttribute('data-lighten', step);
        console.log(`Set data-lighten: ${step}`);
    }

    
    RGBArray.forEach((item, index) => {

        if (step > 9) {
            return;
        } else if(item == 0) {
            RGBArray[index] = 26;
            return;
        } else {
            console.log(item);
            console.log(index);
            RGBArray[index] = parseInt(item) + ( (255 - parseInt(item)) / (10 - parseInt(step)) );
            console.log(parseInt(item));
            console.log(parseInt(step));
            console.log((10 - parseInt(step)));
            console.log(RGBArray[index]);
            return;
        }

    });

    console.log(RGBArray);

    let lightRGB = `rgb(${RGBArray[0]}, ${RGBArray[1]}, ${RGBArray[2]})`;
    return lightRGB;
}


function tenStepsToBlack(targetElement) {
    
    let rgb = getComputedStyle(targetElement).getPropertyValue('background-color');
    
    let RGBArray = rgb.replace(/[^\d,.]/g, '').split(',');

    console.log(RGBArray);

    if (!targetElement.hasAttribute('data-darken')) {
        targetElement.removeAttribute('data-lighten');
        targetElement.setAttribute('data-darken', 0);
        step = targetElement.getAttribute('data-darken');
        console.log(`Set data-darken: ${step}`);
    } else if (targetElement.getAttribute('data-darken') < 10) {
        step = parseInt(targetElement.getAttribute('data-darken')) + 1;
        console.log(step);
        targetElement.setAttribute('data-darken', step);
        console.log(`Set data-darken: ${step}`);
    }

    
    RGBArray.forEach((item, index) => {

        if (step > 9) {
            return;
        } else {
            console.log(item);
            console.log(index);
            RGBArray[index] = parseInt(item) - ( parseInt(item) / (10 - parseInt(step)) );
            console.log(parseInt(item));
            console.log(parseInt(step));
            console.log((10 - parseInt(step)));
            console.log(RGBArray[index]);
            return;
        }

    });

    console.log(RGBArray);

    let darkRGB = `rgb(${RGBArray[0]}, ${RGBArray[1]}, ${RGBArray[2]})`;
    return darkRGB;
}