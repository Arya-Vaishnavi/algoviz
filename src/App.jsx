import { useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");


  const [barColors, setBarColors] = useState([]);
const [animationSpeed, setAnimationSpeed] = useState(100);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  // Generate random array
  const generateArray = () => {
    if (isSorting) return;
    const arr = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setArray(arr);
  };

  // Bubble Sort Visualization (with color highlighting)
const bubbleSort = async () => {
  if (isSorting || array.length === 0) return;
  setIsSorting(true);

  let arr = [...array];
  let n = arr.length;
  let colors = new Array(n).fill("#38bdf8"); // default blue
  setBarColors(colors);

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      colors[j] = "#f87171"; // red - comparing
      colors[j + 1] = "#f87171";
      setBarColors([...colors]);
      await delay(animationSpeed);

      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        setArray([...arr]);
      }

      colors[j] = "#38bdf8"; // back to blue
      colors[j + 1] = "#38bdf8";
    }
    colors[n - i - 1] = "#4ade80"; // green - sorted
  }

  setBarColors(new Array(n).fill("#4ade80"));
  setIsSorting(false);
};

// Merge Sort Visualization
const mergeSort = async () => {
  if (isSorting || array.length === 0) return;
  setIsSorting(true);

  let arr = [...array];
  await mergeSortHelper(arr, 0, arr.length - 1);
  setArray([...arr]);
  setBarColors(new Array(arr.length).fill("#4ade80")); // green
  setIsSorting(false);
};

const mergeSortHelper = async (arr, start, end) => {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);

  await mergeSortHelper(arr, start, mid);
  await mergeSortHelper(arr, mid + 1, end);

  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    barColors[k] = "#f87171"; // red (comparing)
    setBarColors([...barColors]);
    await delay(animationSpeed);

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
    setArray([...arr]);
  }

  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
  setArray([...arr]);
};

// Quick Sort Visualization
const quickSort = async () => {
  if (isSorting || array.length === 0) return;
  setIsSorting(true);

  let arr = [...array];
  await quickSortHelper(arr, 0, arr.length - 1);
  setArray([...arr]);
  setBarColors(new Array(arr.length).fill("#4ade80"));
  setIsSorting(false);
};

const quickSortHelper = async (arr, low, high) => {
  if (low < high) {
    let pi = await partition(arr, low, high);
    await quickSortHelper(arr, low, pi - 1);
    await quickSortHelper(arr, pi + 1, high);
  }
};

const partition = async (arr, low, high) => {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    barColors[j] = "#f87171"; // red (comparing)
    setBarColors([...barColors]);
    await delay(animationSpeed);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setArray([...arr]);
    }
    barColors[j] = "#38bdf8";
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  setArray([...arr]);
  return i + 1;
};

  return (
  <div className="app">
    <header>
      <h1>AlgoViz — Algorithm Visualizer</h1>
    </header>

    <div className="controls">
      <select
        value={selectedAlgo}
        onChange={(e) => setSelectedAlgo(e.target.value)}
        disabled={isSorting}
      >
        <option>Bubble Sort</option>
        <option>Merge Sort</option>
        <option>Quick Sort</option>
      </select>

      <button onClick={generateArray} disabled={isSorting}>
        Generate New Array
      </button>

      <button
        onClick={() => {
          if (selectedAlgo === "Bubble Sort") bubbleSort();
          else if (selectedAlgo === "Merge Sort") mergeSort();
          else if (selectedAlgo === "Quick Sort") quickSort();
        }}
        disabled={isSorting}
      >
        Start Visualization
      </button>
    </div>

    <div className="speed-control">
      <label>Speed:</label>
      <input
        type="range"
        min="20"
        max="500"
        value={animationSpeed}
        onChange={(e) => setAnimationSpeed(Number(e.target.value))}
        disabled={isSorting}
      />
    </div>

    <div className="bars-container">
      {array.map((value, idx) => (
        <div
          key={idx}
          className="bar"
          style={{
            height: `${value * 3}px`,
            backgroundColor: barColors[idx] || "#38bdf8",
            transition: "height 0.2s ease, background-color 0.2s ease",
          }}
        ></div>
      ))}
    </div>

    {/* Time complexity display */}
    <div className="complexity">
      <h3>Algorithm Complexity</h3>
      {selectedAlgo === "Bubble Sort" && (
        <p>
          <strong>Time:</strong> O(n²) &nbsp; | &nbsp;
          <strong>Space:</strong> O(1)
        </p>
      )}
      {selectedAlgo === "Merge Sort" && (
        <p>
          <strong>Time:</strong> O(n log n) &nbsp; | &nbsp;
          <strong>Space:</strong> O(n)
        </p>
      )}
      {selectedAlgo === "Quick Sort" && (
        <p>
          <strong>Time:</strong> O(n log n) (avg), O(n²) (worst) &nbsp; | &nbsp;
          <strong>Space:</strong> O(log n)
        </p>
      )}
    </div>
  </div>
);

}

export default App;