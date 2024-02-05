// Initial minY and maxY values
let minYchange = 10;
let maxYchange = 80;

// Function to update minY value
function updateMinY() {
    const minYInput = document.getElementById('minY');
    minYchange = parseInt(minYInput.value, 10);
    console.log('minYchange updated:', minYchange);
}

// Function to update maxY value
function updateMaxY() {
    const maxYInput = document.getElementById('maxY');
    maxYchange = parseInt(maxYInput.value, 10);
    console.log('maxYchange updated:', maxYchange);
}