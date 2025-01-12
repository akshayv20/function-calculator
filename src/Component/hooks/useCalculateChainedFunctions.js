import { useEffect, useState } from "react";
import { calculateOutput } from "../utils/equationUtils";

const useCalculateChainedFunctions = (initialValue, functions, order) => {
  const [updatedFunctions, setUpdatedFunctions] = useState([]);
  const [finalOutput, setFinalOutput] = useState(0);

  useEffect(() => {
    const calculateChainedFunctions = () => {
      const visited = new Set();
      let currentValue = initialValue;

      const newFunctions = functions.map((func) => ({
        ...func,
        output: 0
      }));

      order.forEach((index) => {
        if (visited.has(index)) return;

        visited.add(index);
        const func = newFunctions[index];
        const output = calculateOutput(func.equation, currentValue);
        func.output = output;
        currentValue = output;
      });

      setUpdatedFunctions(newFunctions);
      setFinalOutput(currentValue);
    };

    calculateChainedFunctions();
  }, [JSON.stringify(functions), initialValue]);

  return { updatedFunctions, finalOutput, setUpdatedFunctions };
};

export default useCalculateChainedFunctions;
