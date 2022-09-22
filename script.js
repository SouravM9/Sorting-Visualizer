// Declare Constants

let TOTALSIZE = 100;
let BARLENGTH = 5;

// Declare Variables

let generateArrayBtn = document.getElementById("newarraybutton");
let arraySlider     = document.getElementById("arrayslider");
let arrayOutput     = document.getElementById("arrayoutput");
let displayArray    = document.getElementById("display");
let bubbleSortBtn   = document.getElementById("bubblesort");
let speed           = document.getElementById("speed");
let insertionSortBtn = document.getElementById("insertionsort");
let selectionSortBtn = document.getElementById("selectionsort");
let mergeSortbtn    = document.getElementById("mergesort");
let countSortBtn    = document.getElementById("countsort");
let countBoard = document.getElementById("counthelper");
let quickSortBtn = document.getElementById("quicksort");

let bodyWidth       = document.body.clientWidth;
let bodyHeight      = document.body.clientHeight;
let arraySize       = arraySlider.value;
let arrayGlobal     = new Array(arraySize);
let speedMeasure = speed.value;

// Define Colors

let DARKBLUE = "#455d7a";
let LIGHTRED = "#f95959";
let LIGHTYELLOW = "#fecea8";
let ORANGE = "#ff5722";
let CREAM = "#eeeeee";
let CYAN = "#90f6d7";

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
    arrayGlobal = new Array(arraySize);

    for (let i = 0; i < arraySize; ++i)
    {
        arrayGlobal[i] = Math.floor(Math.random() * TOTALSIZE) + 1;
    }
    renderBars(arrayGlobal);
    countBoard.innerHTML = "";
}

// Render bars as per array generated

function renderBars(arr) {

    while (displayArray.hasChildNodes()) {
        displayArray.removeChild(displayArray.firstChild);
    }

    displayArray.style.paddingLeft = (bodyWidth * (TOTALSIZE - arraySize)) / (TOTALSIZE * 2) + "px"; // Dynamically set the left padding
    displayArray.style.paddingRight = (bodyWidth * (TOTALSIZE - arraySize)) / (TOTALSIZE * 2) + "px"; // Dynamically set the right padding

    for (let i = 0; i < arr.length; ++i) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] * BARLENGTH + "px";
        displayArray.appendChild(bar);
    }
}

generateArrayBtn.addEventListener("click", function () {
    generateRandomArray();
});

function onLoadSetup() {
    generateRandomArray();
}

// To create some delay for visualization
function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; ++i) {
        for (let j = 0; j < array.length - i - 1; ++j) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] * BARLENGTH + "px";
                bars[j].style.backgroundColor = CREAM;
                bars[j + 1].style.height = array[j + 1] * BARLENGTH + "px";
                bars[j + 1].style.backgroundColor = CYAN;

                await Sleep(speedMeasure);
            }
            if (array[j] < array[j + 1]) {
                bars[j].style.backgroundColor = ORANGE;
                bars[j + 1].style.backgroundColor = ORANGE;
            }
        }
    }
    await Sleep(speedMeasure);
}

bubbleSortBtn.addEventListener("click", async function () {
    disableButtons();
    await bubbleSort(arrayGlobal);
    enableButtons();
});

// Insertion Sort

async function insertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; ++i) {
        let key = array[i];
        let j = i - 1;
        bars[j].style.backgroundColor = CYAN; // Mark the selected key element
        await Sleep(speedMeasure);

        while (j >=0 && array[j] > key) {
            array[j + 1] = array[j];

            bars[j + 1].style.height = array[j + 1] * BARLENGTH + "px";
            bars[j + 1].style.backgroundColor = CREAM;
            await Sleep(speedMeasure);
            bars[j + 1].style.backgroundColor = ORANGE;
            j--;
        }
        array[j + 1] = key;

        bars[j + 1].style.height = array[j + 1] * BARLENGTH + "px";
        bars[j + 1].style.backgroundColor = CYAN;  // Placing the selected key element at right position
        await Sleep(speedMeasure);
        bars[j + 1].style.backgroundColor = ORANGE;
    }
}

insertionSortBtn.addEventListener("click", async function () {
    disableButtons();
    await insertionSort(arrayGlobal);
    enableButtons();
});

// Selection Sort

async function selectionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; ++i) {
        let min = i;

        bars[min].style.backgroundColor = CYAN; // Mark selected element
        await Sleep(speedMeasure);

        for (let j = i + 1; j < array.length; ++j) {
            if (array[min] > array[j])
                min = j;
        }

        if (min !== i) {
            let temp = array[min];
            array[min] = array[i];
            array[i] = temp;

            bars[min].style.backgroundColor = CREAM;  // Mark minimum element
            await Sleep(speedMeasure);

            // swapping
            bars[min].style.height = array[min] * BARLENGTH + "px";
            bars[min].style.backgroundColor = CREAM;

            bars[i].style.height = array[i] * BARLENGTH + "px";
            bars[i].style.backgroundColor = CYAN;
            await Sleep(speedMeasure);
        }

        bars[min].style.backgroundColor = ORANGE;
        bars[i].style.backgroundColor = ORANGE;
    }
}

selectionSortBtn.addEventListener("click",async function () {
    disableButtons();
    await selectionSort(arrayGlobal);
    enableButtons();
});


// Merge Sort

async function mergeSort(array, low, high) {
    let mid = Math.floor((low + high) / 2);
    if (low < high) {
        await mergeSort(array, low, mid);      // To wait for the previous recursions to get completed
        await mergeSort(array, mid + 1, high);
        await merge(array, low, mid, high);
    }
}

async function merge(array, low, mid, high) {

    let n1 = mid - low + 1;
    let n2 = high - mid;
    let k = low;
    let array1 = new Array(n1), array2 = new Array(n2);
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < n1; i++) {
        array1[i] = array[k++];
    }

    for (let i = 0, k = mid + 1; i < n2; i++) {
        array2[i] = array[k++];
    }

    let i = 0;
    let j = 0;
    k = low;

    while (i < n1 && j < n2) {
        if (array1[i] < array2[j]) {
            array[k] = array1[i];

            bars[k].style.height = array[k] * BARLENGTH + "px";
            bars[k].style.backgroundColor = CREAM;
            await Sleep(speedMeasure);

            bars[k].style.backgroundColor = ORANGE;

            i++;
            k++;
        }
        else {
            array[k] = array2[j];

            bars[k].style.height = array[k] * BARLENGTH + "px";
            bars[k].style.backgroundColor = CYAN;
            await Sleep(speedMeasure);

            bars[k].style.backgroundColor = ORANGE;

            j++;
            k++;
        }
    }
    while (i < n1) {
        array[k] = array1[i];

        bars[k].style.height = array[k] * BARLENGTH + "px";
        bars[k].style.backgroundColor = CREAM;
        await Sleep(speedMeasure);

        bars[k].style.backgroundColor = ORANGE;

        i++;
        k++;
    }
    while (j < n2) {
        array[k] = array2[j];

        bars[k].style.height = array[k] * BARLENGTH + "px";
        bars[k].style.backgroundColor = CYAN;
        await Sleep(speedMeasure);

        bars[k].style.backgroundColor = ORANGE;
        j++;
        k++;
    }

}

mergeSortbtn.addEventListener("click", async function () {
    disableButtons();
    await mergeSort(arrayGlobal, 0, arraySize - 1);
    enableButtons();
});

//  Find the maximum element from array

function findMax(array) {
    let max = -1;
    for (let i = 0; i < array.length; ++i) {
        if (array[i] > max)
            max = array[i];
    }
    return max;
}

// Count Sort

async function countSort(array) {

    let max = findMax(array);
    let countArr = new Array(max);
    let i = 0, j = 0;

    for (i = 0; i <= max; ++i) {
        countArr[i] = 0;

        let bar = document.createElement("div");
        bar.classList.add("count");
        bar.style.height = countArr[i] * 0 + "px";
        countBoard.appendChild(bar);
    }

    let countBars = document.getElementsByClassName("count");
    let bars = document.getElementsByClassName("bar");

    for (i = 0; i < array.length; ++i) {
        countArr[array[i]]++;

        bars[i].style.backgroundColor = CYAN;
        await Sleep(speedMeasure / 2);

        bars[i].style.height = "0px";
        countBars[array[i]].style.height = countArr[array[i]] * BARLENGTH + "px";
        await Sleep(speedMeasure);

    }

    j = 0;
    i = 0;
    while (i < array.length) {
        if (countArr[j]) {
            array[i] = j;
            bars[i].style.height = array[i] * BARLENGTH + "px";
            bars[i].style.backgroundColor = CREAM;
            i++;
            countArr[j]--;
            countBars[j].style.backgroundColor = CYAN;
            countBars[j].style.height = countArr[j] * BARLENGTH + "px";
            await Sleep(speedMeasure);

            bars[i - 1].style.backgroundColor = ORANGE;
        }
        else {
            j++;
        }
    }
}

countSortBtn.addEventListener("click",async function () {
    disableButtons();
    await countSort(arrayGlobal);
    enableButtons();
});


//Quick Sort

async function quickSort(arr, low, high) {
    if (low < high) {
        let partitionPos = await partition(arr, low, high);
        await quickSort(arr, low, partitionPos - 1);
        await quickSort(arr, partitionPos + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = low;
    let i = low + 1;
    let j = high;
    let bars = document.getElementsByClassName("bar");

    do {
        while (arr[i] <= arr[pivot])
            i++;

        while (arr[j] > arr[pivot])
            j--;

        if (i < j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            bars[i].style.height = arr[i] * BARLENGTH + "px";
            bars[i].style.backgroundColor = CREAM;

            bars[j].style.height = arr[j] * BARLENGTH + "px";
            bars[j].style.backgroundColor = CYAN;

            await Sleep(speedMeasure);

            bars[i].style.backgroundColor = ORANGE;
            bars[j].style.backgroundColor = ORANGE;
        }
    } while (i < j);

    let temp = arr[pivot];
    arr[pivot] = arr[j];
    arr[j] = temp;

    bars[pivot].style.height = arr[pivot] * BARLENGTH + "px";
    bars[pivot].style.backgroundColor = CREAM;

    bars[j].style.height = arr[j] * BARLENGTH + "px";
    bars[j].style.backgroundColor = CYAN;

    await Sleep(speedMeasure);

    bars[pivot].style.backgroundColor = ORANGE;
    bars[j].style.backgroundColor = ORANGE;

    return j;
}

quickSortBtn.addEventListener("click", async function () {
    disableButtons();
    await quickSort(arrayGlobal, 0, arraySize - 1);
    enableButtons();
});

function disableButtons() {
    bubbleSortBtn.disabled = true;
    bubbleSortBtn.style.cursor = "not-allowed";
    insertionSortBtn.disabled = true;
    insertionSortBtn.style.cursor = "not-allowed";
    selectionSortBtn.disabled = true;
    selectionSortBtn.style.cursor = "not-allowed";
    mergeSortbtn.disabled = true;
    mergeSortbtn.style.cursor = "not-allowed";
    quickSortBtn.disabled = true;
    quickSortBtn.style.cursor = "not-allowed";
    countSortBtn.disabled = true;
    countSortBtn.style.cursor = "not-allowed";
    generateArrayBtn.disabled = true;
    generateArrayBtn.style.cursor = "not-allowed";
}

function enableButtons() {
    bubbleSortBtn.disabled = false;
    bubbleSortBtn.style.cursor = "default";
    insertionSortBtn.disabled = false;
    insertionSortBtn.style.cursor = "default";
    selectionSortBtn.disabled = false;
    selectionSortBtn.style.cursor = "default";
    mergeSortbtn.disabled = false;
    mergeSortbtn.style.cursor = "default";
    quickSortBtn.disabled = false;
    quickSortBtn.style.cursor = "default";
    countSortBtn.disabled = false;
    countSortBtn.style.cursor = "default";
    generateArrayBtn.disabled = false;
    generateArrayBtn.style.cursor = "default";
}