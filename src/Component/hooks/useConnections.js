import { useEffect, useRef } from "react";
import { connectElements } from "../utils/svgUtils";

const useConnections = (connections) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const redrawConnections = () => {
      const svg = svgRef.current;
      if (!svg) return;

      // Clear existing paths in the SVG
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      // Draw all connections
      connections.forEach(({ from, to }) => {
        const fromElement = document.getElementById(from);
        const toElement = document.getElementById(to);
        if (fromElement && toElement) {
          connectElements(fromElement, toElement, svg);
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
  }, [connections]);

  return svgRef;
};

export default useConnections;
