export const connectElements = (from, to, svg) => {
  if (!from || !to || !svg) return;

  const rect1 = from.getBoundingClientRect();
  const rect2 = to.getBoundingClientRect();

  const startX = rect1.right + window.scrollX;
  const startY = rect1.top + rect1.height / 2 + window.scrollY;
  const endX = rect2.left + window.scrollX;
  const endY = rect2.top + rect2.height / 2 + window.scrollY;

  const distance = Math.hypot(endX - startX, endY - startY);

  const conditions = [
    {
      min: 0,
      max: 200,
      controlRadius: (d) => d / 2 - 190,
      arcFlag: 0
    },
    {
      min: 200,
      max: 400,
      controlRadius: (d) => d / 2 - 500,
      arcFlag: 0
    },
    {
      min: 400,
      max: Infinity,
      cubicBezier: true
    }
  ];

  let pathData = "";

  const condition = conditions.find(
    (cond) => distance >= cond.min && distance <= cond.max
  );

  if (condition) {
    if (condition.cubicBezier) {
      pathData = `M ${startX} ${startY} C ${startX} ${
        (startY + endY) / 2
      }, ${endX} ${(startY + endY) / 2}, ${endX} ${endY}`;
    } else {
      const controlRadius = condition.controlRadius(distance);
      pathData = `M ${startX} ${startY} A ${controlRadius} ${controlRadius} 0 ${condition.arcFlag} 0 ${endX} ${endY}`;
    }
  }

  drawPath(pathData, from, to, svg);
};

const drawPath = (pathData, from, to, svg) => {
  const existingPath = svg.querySelector(
    `path[data-from="${from.id}"][data-to="${to.id}"]`
  );
  if (existingPath) {
    svg.removeChild(existingPath);
  }

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#0066FF4D");
  path.setAttribute("stroke-width", "7");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("data-from", from.id);
  path.setAttribute("data-to", to.id);

  svg.appendChild(path);
};
