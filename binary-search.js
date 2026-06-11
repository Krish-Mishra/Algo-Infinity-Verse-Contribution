// binary-search.js

const arrayContainer = document.getElementById('array-container');
const stepBtn = document.getElementById('step-btn');
const resetBtn = document.getElementById('reset-btn');

const lowValEl = document.getElementById('low-val');
const midValEl = document.getElementById('mid-val');
const highValEl = document.getElementById('high-val');
const statusText = document.getElementById('status-text');

// The sorted array we are searching through
const searchArray = [4, 9, 15, 21, 28, 37, 42, 55, 68, 73];
const targetValue = 37; // The number we want to find

// Algorithm state variables
let low = 0;
let high = searchArray.length - 1;
let mid = null;
let isFinished = false;

function renderArray() {
    arrayContainer.innerHTML = ''; // Clear container

    searchArray.forEach((num, index) => {
        const el = document.createElement('div');
        el.className = 'array-element';
        el.id = `box-${index}`;
        el.innerText = num;
        arrayContainer.appendChild(el);
    });

    updateUI();
}

// Update the Visuals based on State
function updateUI() {
    lowValEl.innerText = low;
    highValEl.innerText = high;
    midValEl.innerText = mid !== null ? mid : '-';

    for (let i = 0; i < searchArray.length; i++) {
        const box = document.getElementById(`box-${i}`);
        box.className = 'array-element'; // Reset classes

        // Gray out eliminated numbers
        if (i < low || i > high) {
            box.classList.add('eliminated');
        }
        
        // Highlight the mid point if it exists
        if (i === mid && !isFinished) {
            box.classList.add('mid');
        }

        // Highlight success
        if (isFinished && i === mid && searchArray[i] === targetValue) {
            box.classList.add('found');
        }
    }
}

function stepForward() {
    if (isFinished) return;

    if (low > high) {
        statusText.innerText = `Target ${targetValue} not found in the array.`;
        isFinished = true;
        stepBtn.disabled = true;
        return;
    }

    // Phase 1: Calculate Mid
    if (mid === null) {
        mid = Math.floor((low + high) / 2);
        statusText.innerHTML = `Calculated mid index: <strong>${mid}</strong>. Checking if ${searchArray[mid]} is equal to ${targetValue}.`;
        updateUI();
        return; // Pause here so user sees the mid calculation
    }

    // Phase 2: Compare and adjust pointers
    if (searchArray[mid] === targetValue) {
        statusText.innerHTML = `🎉 Target <strong>${targetValue}</strong> found at index <strong>${mid}</strong>!`;
        isFinished = true;
        stepBtn.disabled = true;
    } else if (searchArray[mid] < targetValue) {
        statusText.innerHTML = `${searchArray[mid]} is less than ${targetValue}. Eliminating the left half.`;
        low = mid + 1;
        mid = null; // Reset mid for the next step
    } else {
        statusText.innerHTML = `${searchArray[mid]} is greater than ${targetValue}. Eliminating the right half.`;
        high = mid - 1;
        mid = null; // Reset mid for the next step
    }

    updateUI();
}

// Reset functionality
function resetSearch() {
    low = 0;
    high = searchArray.length - 1;
    mid = null;
    isFinished = false;
    stepBtn.disabled = false;
    statusText.innerText = `Click "Step Forward" to begin searching for ${targetValue}.`;
    updateUI();
}

// Event Listeners
stepBtn.addEventListener('click', stepForward);
resetBtn.addEventListener('click', resetSearch);

// Initialize the visualizer on load
renderArray();