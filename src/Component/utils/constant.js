export const LOCAL_STORAGE_KEYS = {
  INITIAL_VALUE: "initialValue",
  FUNCTIONS: "functions",
  FINAL_OUTPUT: "finalOutput"
};


export const defaultFunctions = [
  { id: 1, equation: "x^2", output: 0, next: 2 },
  { id: 2, equation: "2*x+4", output: 0, next: 4 },
  { id: 3, equation: "x^2+20", output: 0, next: -1 },
  { id: 4, equation: "x-2", output: 0, next: 5 },
  { id: 5, equation: "x/2", output: 0, next: 3 }
];


export const connections = [
  { from: "connector-input", to: "input-1" },
  { from: "output-1", to: "input-2" },
  { from: "output-2", to: "input-4" },
  { from: "output-4", to: "input-5" },
  { from: "output-5", to: "input-3" },
  { from: "output-3", to: "connector-output" }
];
