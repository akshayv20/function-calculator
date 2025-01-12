const validateEquation = (equation) => /^[0-9x+\-*/^ ()]*$/.test(equation);

export const calculateOutput = (equation, input) => {
  try {
    let modifiedEquation = equation.replace(/(\d)(x)/g, "$1*$2");

    modifiedEquation = modifiedEquation.replace(/(\^)/g, "**");

    modifiedEquation = modifiedEquation.replaceAll("x", `(${input})`);

    const result = Function(`return ${modifiedEquation}`)();
    return result;
  } catch (error) {
    return "Error";
  }
};
export default validateEquation;
