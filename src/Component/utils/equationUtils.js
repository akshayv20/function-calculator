const validateEquation = (equation) => /^[0-9x+\-*/^ ()]*$/.test(equation);

export const calculateOutput = (equation, input) => {
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
export default validateEquation;
