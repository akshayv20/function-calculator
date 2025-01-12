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
      // Handle `2x` as `2*x`
      let modifiedEquation = equation.replace(/(\d)(x)/g, "$1*$2");

      // Handle exponentiation: `x^2` to `x**2`
      modifiedEquation = modifiedEquation.replace(/(\^)/g, "**");

      // Replace `x` with the actual input value
      modifiedEquation = modifiedEquation.replaceAll("x", `(${input})`);

      // Use the Function constructor to evaluate the expression
      const result = Function(`return ${modifiedEquation}`)();
      return result;
    } catch (error) {
      return "Error";
    }
  };
  useEffect(() => {
    const calculateChainedFunctions = () => {
      const visited = new Set();
      let currentValue = initialValue;

      // Define the fixed order of function execution
      const order = [0, 1, 3, 4, 2]; // Corresponding to functions 1 -> 2 -> 4 -> 5 -> 3 (0-indexed)

      const updatedFunctions = functions.map((func) => ({
        ...func,
        output: 0
      }));

      // Iterate through the functions based on the fixed order
      order.forEach((index) => {
        if (visited.has(index)) return;

        visited.add(index);
        const func = updatedFunctions[index];
        const output = calculateOutput(func.equation, currentValue);
        func.output = output;
        currentValue = output;
      });

      setFunctions(updatedFunctions);
      setFinalOutput(currentValue);
    };

    calculateChainedFunctions();
  }, [initialValue, JSON.stringify(functions)]);

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
    path.setAttribute("stroke", "#0066FF4F");
    path.setAttribute("stroke-width", "7");
    path.setAttribute("fill", "none");
    path.setAttribute("data-from", from.id);
    path.setAttribute("data-to", to.id);

    // Append the new path to the SVG
    svg.appendChild(path);
  };

  useEffect(() => {
    const redrawConnections = () => {
      const svg = svgRef.current;
      if (!svg) return;

      // Clear existing paths in the SVG
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      // Define the connections
      const connections = [
        { from: "connector-input", to: "input-1" },
        { from: "output-1", to: "input-2" },
        { from: "output-2", to: "input-4" },
        { from: "output-4", to: "input-5" },
        { from: "output-5", to: "input-3" },
        { from: "output-3", to: "connector-output" }
      ];

      // Redraw all connections
      connections.forEach(({ from, to }) => {
        const fromElement = document.getElementById(from);
        const toElement = document.getElementById(to);
        if (fromElement && toElement) {
          connectElements(fromElement, toElement);
        }
      });
    };

    // Initial draw
    redrawConnections();

    // Add event listeners for resize and scroll
    window.addEventListener("resize", redrawConnections);
    window.addEventListener("scroll", redrawConnections);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("resize", redrawConnections);
      window.removeEventListener("scroll", redrawConnections);
    };
  }, []);

  return (
    <div className='p-10 flex align-center justify-center m-10 gap-4'>
      <div className='flex flex-col items-center justify-center gap-2 '>
        <label className='text-xs font-bold tracking-tighter text-white bg-orange-400 py-1 px-3 rounded-xl'>
          Initial value of x
        </label>
        <div className='w-[111px] h-[50px] rounded-[15px] border-2 border-[#FFC267] flex items-center justify-center overflow-hidden'>
          <input
            type='number'
            value={initialValue}
            onChange={(e) => setInitialValue(Number(e.target.value))}
            className='w-2/3 h-full border-none outline-none text-center text-lg font-bold text-black bg-transparent'
          />
          <div className='w-1/3 h-full border-l border-1 border-[#FFEED5] flex items-center justify-center '>
            <div
              className='flex items-center text-xs font-bold text-gray-600 gap-1.5 connector-label-input'
              id='connector-label-input'
            >
              <div className='w-[15px] h-[15px] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
                <span
                  className='w-[7px] h-[7px] bg-blue-600 rounded-full'
                  id='connector-input'
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-24 '>
        <div className='flex flex-wrap justify-between gap-32 relative'>
          {functions.slice(0, 3).map((func, index) => (
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

        <div className='flex justify-center gap-32 mt-2 ml-2'>
          {functions.slice(3, 5).map((func, index) => (
            <FunctionCard
              key={index + 3}
              ref={(el) => (functionRefs.current[index + 3] = el)}
              title={`Function ${index + 4}`}
              equation={func.equation}
              onChange={(e) => handleEquationChange(index + 3, e.target.value)}
              output={func.output}
              nextFunction={func.next}
              onNextChange={(e) =>
                handleNextChange(index + 3, parseInt(e.target.value))
              }
              index={index + 3}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col items-center justify-center gap-2'>
        <label className='text-xs font-bold tracking-tighter text-white bg-green-500 py-1 px-3 rounded-xl'>
          Final Output (y)
        </label>
        <div className='w-[108px] h-[50px] rounded-[15px] border-2 border-[#2DD179] flex items-center justify-center overflow-hidden'>
          <div className='w-1/3 h-full border-r border-1 border-[#C5F2DA]  flex items-center justify-center'>
            <div className='flex items-center text-xs font-bold text-gray-600 gap-1.5'>
              <div className='w-[15px] h-[15px] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
                <span
                  className='w-[7px] h-[7px] bg-blue-600 rounded-full'
                  id='connector-output'
                ></span>
              </div>
            </div>
          </div>
          <p className='w-2/3 h-full text-center text-lg font-bold text-black bg-transparent flex items-center justify-center m-0'>
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
