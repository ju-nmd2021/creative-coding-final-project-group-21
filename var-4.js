// Var 1
   let minYchange = 0; 
   let maxYchange = 300;

   let colRand = false; 
   let layers = 5;

// Var 2
   let rotStripe = 0; 

 // Var 3
   let lines = true;
   let alph = 150; 

   let filling = true;
   let colorLines = true; 

// Var 4
// Initial stroke weight is set to 8
let sw = localStorage.getItem('strokeWeight') ? parseInt(localStorage.getItem('strokeWeight')) : 8;

// Ensure that the value in localStorage is always 8
localStorage.setItem('strokeWeight', 8);
document.getElementById('currentStrokeWeight').textContent = sw;

// Add this part of code was get help from ChatGTP, my previous version need reloaded my page twice to get the initial value: 8
document.addEventListener('DOMContentLoaded', function() {
    // Initial stroke weight is set to 8
    let sw = localStorage.getItem('strokeWeight') ? parseInt(localStorage.getItem('strokeWeight')) : 8;

    // Ensure that the value in localStorage is always 8
    localStorage.setItem('strokeWeight', sw);
    document.getElementById('currentStrokeWeight').textContent = sw;
});

function changestrokeWeight() {
    const inputElement = document.getElementById('swInput');
    const weightValue = parseInt(inputElement.value);
   
    if (!isNaN(weightValue) && weightValue >= 1 && weightValue <= 15) {
        sw = weightValue;
        // Store the updated stroke weight value in localStorage
        localStorage.setItem('strokeWeight', sw);
        document.getElementById('currentStrokeWeight').textContent = sw;
        inputElement.value = "";
    } else {
        alert('Please enter a valid stroke weight value between 1 and 15.');
    }
}

let extraBlack = 0;
let extraBlackAlph = 0;
let r, g, b;
let table;
   
function preload() {
     table = loadTable("colors.csv", "csv", "header");
   }
   
function setup() {
    createCanvas(windowWidth-20, windowHeight-20);
     
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
           fill(255,255,255);
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
    save("myCanvasVar4.jpg");
}