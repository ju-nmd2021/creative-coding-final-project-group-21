// Var 1
let minYchange = 10;
let maxYchange = 200;

let layers = 3;

// Var 2
let rotStripe = 0;

// Color Alph change (Var 3)
// Initial alph is 100, the avalible value is 0-255
let lines = false;
let alph = 100;

// Check if there's a stored value in localStorage, otherwise set it to 100
let alphElement = localStorage.getItem('alph') ? parseInt(localStorage.getItem('alph')) : 100;
// Ensure that the value in localStorage is always 100
localStorage.setItem('alph', 100);
document.getElementById('currentAlph').textContent = alph;

function changeAlph() {
    const inputElement = document.getElementById('alphInput');
    const alphValue = parseInt(inputElement.value);
   
    if (!isNaN(alphValue) && alphValue >= 0 && alphValue <= 255) {
        alph = alphValue;
        // Ignore the input value and always set the value to 100 in localStorage
        localStorage.setItem('alph', 100);
        document.getElementById('currentAlph').textContent = alph;
        inputElement.value = "";
    } else {
        alert('Please enter a valid alpha value between 0 and 255.');
    }
}

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
    save("myCanvas.jpg");
}