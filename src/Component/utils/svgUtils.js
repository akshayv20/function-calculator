export const connectElements = (from, to, svg) => {
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
  const pathData = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${
    (startX + endX) / 2
  } ${endY}, ${endX} ${endY}`;

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
  path.setAttribute("stroke", "#0066FF4D");
  path.setAttribute("stroke-width", "7");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("data-from", from.id);
  path.setAttribute("data-to", to.id);

  // Append the new path to the SVG
  svg.appendChild(path);
};
