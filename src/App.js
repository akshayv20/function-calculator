import React, { useEffect, useState } from "react";
import FunctionCard from "./Component/FunctionCard";
import InitialInput from "./Component/InitialInput";
import FinalOutput from "./Component/FinalOutput";
import useCalculateChainedFunctions from "./Component/hooks/useCalculateChainedFunctions";
import validateEquation from "./Component/utils/equationUtils";
import useConnections from "./Component/hooks/useConnections";
import {
  LOCAL_STORAGE_KEYS,
  defaultFunctions
} from "./Component/utils/constant";
import "./App.css";
import { debounce } from "./Component/utils/debounce";

const App = () => {
  // Load initial value from localStorage or default to 2
  const [initialValue, setInitialValue] = useState(() => {
    return (
      parseFloat(localStorage.getItem(LOCAL_STORAGE_KEYS.INITIAL_VALUE)) || 2
    );
  });

  // Load functions from localStorage or use default functions
  const [functions, setFunctions] = useState(() => {
    const storedFunctions = localStorage.getItem(LOCAL_STORAGE_KEYS.FUNCTIONS);
    if (storedFunctions) {
      const parsedFunctions = JSON.parse(storedFunctions);
      if (Array.isArray(parsedFunctions) && parsedFunctions.length > 0) {
        return parsedFunctions;
      }
    }

    // Store default functions in localStorage if not present
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.FUNCTIONS,
      JSON.stringify(defaultFunctions)
    );
    return defaultFunctions;
  });

  const order = [0, 1, 3, 4, 2];

  // Calculate chained functions and final output
  const { updatedFunctions, finalOutput, setUpdatedFunctions } =
    useCalculateChainedFunctions(initialValue, functions, order);

  // Handle diagram connections
  const connections = [
    { from: "connector-input", to: "input-1" },
    { from: "output-1", to: "input-2" },
    { from: "output-2", to: "input-4" },
    { from: "output-4", to: "input-5" },
    { from: "output-5", to: "input-3" },
    { from: "output-3", to: "connector-output" }
  ];

  const svgRef = useConnections(connections);

  // Handle equation changes for functions
  const handleEquationChange = (index, newEquation) => {
    if (validateEquation(newEquation)) {
      const updated = [...updatedFunctions];
      updated[index].equation = newEquation;
      setUpdatedFunctions(updated);
      setFunctions(updated);

      // Save updated functions to localStorage
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.FUNCTIONS,
        JSON.stringify(updated)
      );
    }
  };

  // Save initialValue and finalOutput to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.INITIAL_VALUE, initialValue);
  }, [initialValue]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FINAL_OUTPUT, finalOutput);
  }, [finalOutput]);

  return (
    <div className='p-4 flex align-center justify-center m-10 gap-4'>
      <InitialInput value={initialValue} onChange={setInitialValue} />

      <div className='flex flex-wrap justify-center gap-32 relative'>
        {updatedFunctions.map((func, index) => (
          <FunctionCard
            key={index}
            title={`Function: ${index + 1}`}
            equation={func.equation}
            onChange={(e) =>
              debounce(handleEquationChange(index, e.target.value), 1000)
            }
            nextFunction={func.next}
            index={index}
          />
        ))}
      </div>

      <FinalOutput value={finalOutput} />
      <svg
        ref={svgRef}
        className='absolute top-0 left-0 w-full h-full'
        style={{ pointerEvents: "none", zIndex: 10 }}
      />
    </div>
  );
};

export default App;
