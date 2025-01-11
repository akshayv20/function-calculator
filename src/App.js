import React, { useState, useEffect, useRef } from "react";
import FunctionCard from "./Component/FunctionCard";
import "./App.css";

const validateEquation = (equation) => /^[0-9x+\-*/^ ()]*$/.test(equation);

const App = () => {
  const [initialValue, setInitialValue] = useState(2);
  const [functions, setFunctions] = useState([
    { id: 1, equation: "x^2", output: 0, next: 2 },
    { id: 2, equation: "2*x+4", output: 0, next: 3 },
    { id: 3, equation: "x^2+20", output: 0, next: 4 },
    { id: 4, equation: "x-2", output: 0, next: 5 },
    { id: 5, equation: "x/2", output: 0, next: -1 }
  ]);
  const [finalOutput, setFinalOutput] = useState(0);

  // To store references to each function card
  const functionRefs = useRef([]);
  const svgRef = useRef(null);

  const calculateOutput = (equation, input) => {
    try {
      const replaced = equation.replaceAll("x", `(${input})`);
      const result = Function(`return ${replaced}`)();
      return result;
    } catch (error) {
      return "Error";
    }
  };

  useEffect(() => {
    const calculateChainedFunctions = () => {
      const visited = new Set();
      let currentValue = initialValue;
      let index = 0;

      const updatedFunctions = functions.map((func) => ({
        ...func,
        output: 0
      }));

      while (index !== -1 && !visited.has(index)) {
        visited.add(index);
        const func = updatedFunctions[index];
        const output = calculateOutput(func.equation, currentValue);
        func.output = output;
        currentValue = output;
        index = func.next !== -1 ? func.next - 1 : -1;
      }

      setFunctions(updatedFunctions);
      setFinalOutput(currentValue);
    };

    calculateChainedFunctions();
  }, []);

  const handleEquationChange = (index, newEquation) => {
    if (validateEquation(newEquation)) {
      const updatedFunctions = [...functions];
      updatedFunctions[index].equation = newEquation;
      setFunctions(updatedFunctions);
    }
  };

  const handleNextChange = (index, nextIndex) => {
    const updatedFunctions = [...functions];
    updatedFunctions[index].next = nextIndex;
    setFunctions(updatedFunctions);
  };

  const connectElements = (from, to) => {
    const svg = svgRef.current;
    if (!from || !to || !svg) return;

    // Get bounding rectangles for both elements
    const rect1 = from.getBoundingClientRect();
    const rect2 = to.getBoundingClientRect();

    // Calculate the start and end positions
    const startX = rect1.right + window.scrollX;
    const startY = rect1.top + rect1.height / 2 + window.scrollY;
    const endX = rect2.left + window.scrollX;
    const endY = rect2.top + rect2.height / 2 + window.scrollY;

    // Create a cubic bezier path
    const pathData = `M ${startX} ${startY} C ${
      (startX + endX) / 2
    } ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;

    // Check if the path already exists; if so, remove it
    const existingPath = svg.querySelector(
      `path[data-from="${from.id}"][data-to="${to.id}"]`
    );
    if (existingPath) {
      svg.removeChild(existingPath);
    }

    // Create a new path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", "#007bff");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    path.setAttribute("data-from", from.id);
    path.setAttribute("data-to", to.id);

    // Append the new path to the SVG
    svg.appendChild(path);
  };

  useEffect(() => {
    // Clear existing paths in the SVG
    const svg = svgRef.current;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Redraw connections
    const connections = [
      { from: "connector-input", to: "input-1" },
      { from: "output-1", to: "input-2" },
      { from: "output-2", to: "input-4" },
      { from: "output-4", to: "input-5" },
      { from: "output-5", to: "input-3" },
      { from: "output-3", to: "connector-output" }
    ];

    connections.forEach(({ from, to }) => {
      const fromElement = document.getElementById(from);
      const toElement = document.getElementById(to);
      if (fromElement && toElement) {
        connectElements(fromElement, toElement);
      }
    });
  }, [functions]); // Redraw lines whenever `functions` changes
  // Redraw lines whenever `functions` changes

  return (
    <div className='p-10 flex align-center justify-center m-10 gap-8'>
      <div className='flex flex-col items-center gap-2'>
        <label className='text-sm font-semibold text-white bg-orange-400 py-1 px-2 rounded-xl'>
          Initial value of x
        </label>
        <div className='flex items-center w-36 h-12 border-2 border-orange-400 rounded-xl overflow-hidden'>
          <input
            type='number'
            value={initialValue}
            onChange={(e) => setInitialValue(Number(e.target.value))}
            className='w-1/2 h-full border-none outline-none text-center text-lg font-bold text-black bg-transparent'
          />
          <div className='w-1/2 h-full border-l border-gray-300 flex items-center justify-center bg-gray-100'>
            <div
              className='flex items-center text-xs font-bold text-gray-600 gap-1.5 connector-label-input'
              id='connector-label-input'
            >
              <span
                className='w-2 h-2 bg-blue-600 rounded-full'
                id='connector-input'
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-8 relative'>
        {functions.map((func, index) => (
          <FunctionCard
            key={index}
            ref={(el) => (functionRefs.current[index] = el)}
            title={`Function ${index + 1}`}
            equation={func.equation}
            onChange={(e) => handleEquationChange(index, e.target.value)}
            output={func.output}
            nextFunction={func.next}
            onNextChange={(e) =>
              handleNextChange(index, parseInt(e.target.value))
            }
            index={index}
          />
        ))}
      </div>

      <div className='flex flex-col items-center gap-2'>
        <label className='text-sm font-semibold text-white bg-green-500 py-1 px-2 rounded-xl'>
          Final Output (y)
        </label>
        <div className='flex items-center w-36 h-12 border-2 border-green-500 rounded-xl overflow-hidden'>
          <div className='w-1/2 h-full border-l border-gray-300 bg-gray-100 flex items-center justify-center'>
            <div className='flex items-center text-xs font-bold text-gray-600 gap-1.5'>
              <span
                className='w-2 h-2 bg-blue-600 rounded-full'
                id='connector-output'
              ></span>
            </div>
          </div>
          <p className='w-1/2 h-full text-center text-lg font-bold text-black bg-transparent flex items-center justify-center m-0'>
            {finalOutput}
          </p>
        </div>
      </div>

      <svg
        ref={svgRef}
        className='absolute top-0 left-0 w-full h-full'
        style={{ pointerEvents: "none", zIndex: 10 }}
      >
        {/* Lines will be rendered here */}
      </svg>
    </div>
  );
};

export default App;
