let minYchange = 0;
let maxYchange = 50;

let layers = 5;

// Initial angle is 0, the angle avalible value is 0-90 
let rotStripe = 0;

        function changeRotation() {
            const inputElement = document.getElementById('rotStripeInput');
            const rotationValue = parseInt(inputElement.value);

            if (!isNaN(rotationValue) && rotationValue >= 0 && rotationValue <= 90) {
                rotStripe = rotationValue;
                document.getElementById('currentRotation').textContent = rotStripe;
            } else {
                alert('Please enter a valid rotation value between 0 and 90.');
            }
        }

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
    save("myCanvas.jpg");
}