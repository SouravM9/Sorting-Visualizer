// Declare Constants

let TOTALSIZE = 100;

// Declare Variables

let arraySlider = document.getElementById("arrayslider");
let arrayOutput = document.getElementById("arrayoutput");
let displayArray = document.getElementById("display");
let bubbleSortBtn = document.getElementById("bubblesort");
let speed = document.getElementById("speed");
let insertionSortBtn = document.getElementById("insertionsort");
let selectionSortBtn = document.getElementById("selectionsort");

let bodyWidth = document.body.clientWidth;
let bodyHeight = document.body.clientHeight;
let arraySize = arraySlider.value;
let array = new Array(arraySize);
let speedMeasure = speed.value;

// Get Slider value and show on page

arrayOutput.innerHTML = arraySlider.value;

arraySlider.oninput = function () {
    arraySize = this.value;  // save the array size
    arrayOutput.innerHTML = this.value;
}
speed.onchange = function () {
    speedMeasure = this.value;
}

// Generate Random array as per input

function generateRandomArray() {
    array = new Array(arraySize);

    for (let i = 0; i < arraySize; ++i)
    {
        array[i] = Math.floor(Math.random() * TOTALSIZE) + 1;
    }
    renderBars(array);
}

// Render bars as per array generated

function renderBars(arr) {

    while (displayArray.hasChildNodes()) {
        displayArray.removeChild(displayArray.firstChild);
    }

    displayArray.style.paddingLeft = (bodyWidth * (TOTALSIZE - arraySize)) / (TOTALSIZE * 2) + "px"; // Dynamically set the left padding

    for (let i = 0; i < arr.length; ++i) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] * 5 + "px";
        displayArray.appendChild(bar);
    }
}

function onLoadSetup() {
    generateRandomArray();
}

// To create some delay for visualization
function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; ++i) {
        for (let j = 0; j < array.length - i - 1; ++j) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] * 5 + "px";
                bars[j].style.backgroundColor = "#fecea8";
                bars[j + 1].style.height = array[j + 1] * 5 + "px";
                bars[j + 1].style.backgroundColor = "#f95959";

                await Sleep(speedMeasure);
            }
            if (array[j] < array[j + 1]) {
                bars[j].style.backgroundColor = "#455d7a";
                bars[j + 1].style.backgroundColor = "#455d7a";
            }
        }
    }
    await Sleep(speedMeasure);
}

bubbleSortBtn.addEventListener("click", function () {
    bubbleSort();
});

// Insertion Sort

async function insertionSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; ++i) {
        let key = array[i];
        let j = i - 1;
        bars[j].style.backgroundColor = "#f95959"; // Mark the selected key element
        await Sleep(speedMeasure);

        while (j >=0 && array[j] > key) {
            array[j + 1] = array[j];

            bars[j + 1].style.height = array[j + 1] * 5 + "px";
            bars[j + 1].style.backgroundColor = "#fecea8";
            await Sleep(speedMeasure);
            bars[j + 1].style.backgroundColor = "#455d7a";
            j--;
        }
        array[j + 1] = key;

        bars[j + 1].style.height = array[j + 1] * 5 + "px";
        bars[j + 1].style.backgroundColor = "#f95959";  // Placing the selected key element at right position
        await Sleep(speedMeasure);
        bars[j + 1].style.backgroundColor = "#455d7a";
    }
}

insertionSortBtn.addEventListener("click", function () {
    insertionSort();
});

// Selection Sort

async function selectionSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; ++i) {
        let min = i;

        bars[min].style.backgroundColor = "#f95959"; // Mark selected element
        await Sleep(speedMeasure);

        for (let j = i + 1; j < array.length; ++j) {
            if (array[min] > array[j])
                min = j;
        }

        if (min !== i) {
            let temp = array[min];
            array[min] = array[i];
            array[i] = temp;

            bars[min].style.backgroundColor = "#fecea8";  // Mark minimum element
            await Sleep(speedMeasure);

            // swapping
            bars[min].style.height = array[min] * 5 + "px";
            bars[min].style.backgroundColor = "#fecea8";

            bars[i].style.height = array[i] * 5 + "px";
            bars[i].style.backgroundColor = "#f95959";
            await Sleep(speedMeasure);
        }

        bars[min].style.backgroundColor = "#455d7a";
        bars[i].style.backgroundColor = "#455d7a";
    }
}

selectionSortBtn.addEventListener("click", function () {
    selectionSort();
});
