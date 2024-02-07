// // Initial minY and maxY values
// let minYchange = 10;
// let maxYchange = 80;

// Check if there's a stored value in localStorage, otherwise set it to 10 for minY and 80 for maxY
let minYchange = localStorage.getItem('minYchange') ? parseInt(localStorage.getItem('minYchange')) : 10;
let maxYchange = localStorage.getItem('maxYchange') ? parseInt(localStorage.getItem('maxYchange')) : 80;

// Ensure that the values in localStorage are always 10 for minY and 80 for maxY
localStorage.setItem('minYchange', 10);
localStorage.setItem('maxYchange', 80);
document.getElementById('currentOverlap').textContent = minYchange;
document.getElementById('currentWidth').textContent = maxYchange;

// Function to update minY value
function updateMinY() {
    const minYInput = document.getElementById('minY');
    const value = parseInt(minYInput.value, 10);
    
    if (!isNaN(value) && value >= 0 && value <= 100) {
        minYchange = value; 
        // Ignore the input value and always set the value to 10 in localStorage
        localStorage.setItem('minYchange', 10);
        minYInput.value = "";
        document.getElementById('currentOverlap').textContent = minYchange;
        console.log('minYchange updated:', minYchange);
    } else {
        console.error('Invalid input for minY:', minYInput.value);
        alert('Please enter a valid number for Overlap between 0 and 100.');
    }
}

// Function to update maxY value
function updateMaxY() {
    const maxYInput = document.getElementById('maxY');
    const value = parseInt(maxYInput.value, 10);
    
    if (!isNaN(value) && value >= 0 && value <= 100) {
        maxYchange = value; 
        // Ignore the input value and always set the value to 80 in localStorage
        localStorage.setItem('maxYchange', 80);
        maxYInput.value = "";
        document.getElementById('currentWidth').textContent = maxYchange;
        console.log('maxYchange updated:', maxYchange);
    } else {
        console.error('Invalid input for maxY:', maxYInput.value);
        alert('Please enter a valid number for Width between 0 and 100.');
    }
}

let layers = 5;
let rotStripe = 0;

let lines = true;
let alph = 255; 
let colRand = false; 
let filling = true;
let colorLines = false; 
let sw = 3; 
let extraBlack = 0; 
let extraBlackAlph = 255; 
let r, g, b;
let table;

function preload() {
    table = loadTable("colors.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth-50, windowHeight-70);
    
    if (lines == true) {
        stroke(0, 0, 0, extraBlackAlph);
        strokeWeight(sw);
    } else {
        noStroke();
    }
    angleMode(DEGREES);
    let end = height / 2 + 500; //where lines stop
    let palette = floor(random(676));
    for (let i = 0; i < layers; i++) {
        let y1;
        if (i == 0) {
            y1 = -height / 2 - 300;
        } else {
            y1 = -height / 2 + (height / layers) * i;
        }
        //starting height for each layer
        let y2 = y1,
            y3 = y1,
            y4 = y1,
            y5 = y1,
            y6 = y1;
        let rotLayer = random(359); //layer rotation
        let rotThisStripe = 0;
        //keep going until all the lines are at the bottom
        while (
            (y1 < end) &
            (y2 < end) &
            (y3 < end) &
            (y4 < end) &
            (y5 < end) &
            (y6 < end) &
            (-maxYchange < minYchange)
        ) {
            y1 += random(minYchange, maxYchange);
            y2 += random(minYchange, maxYchange);
            y3 += random(minYchange, maxYchange);
            y4 += random(minYchange, maxYchange);
            y5 += random(minYchange, maxYchange);
            y6 += random(minYchange, maxYchange);
            if (colRand == true) {
                r = random(256);
                g = random(256);
                b = random(256);
            } else {
                let col = floor(random(5 + extraBlack));
                r = table.get(palette, col * 3);
                g = table.get(palette, col * 3 + 1);
                b = table.get(palette, col * 3 + 2);
            }
            if (filling == true) {
                fill(r, g, b, alph);
            } else {
                noFill();
            }
            if (colorLines == true) {
                stroke(r, g, b, alph);
            }
            push();
            translate(width / 2, height / 2);
            rotThisStripe += rotStripe; //rotating after each stripe
            rotate(rotThisStripe + rotLayer);
            let xStart = -width / 2;
            beginShape();
            curveVertex(xStart - 300, height / 2 + 500);
            curveVertex(xStart - 300, y1);
            curveVertex(xStart + (width / 5) * 1, y2);
            curveVertex(xStart + (width / 5) * 2, y3);
            curveVertex(xStart + (width / 5) * 3, y4);
            curveVertex(xStart + (width / 5) * 4, y5);
            curveVertex(width / 2 + 300, y6);
            curveVertex(width / 2 + 300, height / 2 + 500);
            endShape(CLOSE);
            pop();
        }
    }
}

function changeImage() {
    setup();
}

function saveImage() {
    save("myCanvasVar1.jpg");
}