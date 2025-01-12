import { useEffect, useRef } from "react";
import { connectElements } from "../utils/svgUtils";

const useConnections = (connections) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const redrawConnections = () => {
      const svg = svgRef.current;
      if (!svg) return;

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      connections.forEach(({ from, to }) => {
        const fromElement = document.getElementById(from);
        const toElement = document.getElementById(to);
        if (fromElement && toElement) {
          connectElements(fromElement, toElement, svg);
        }
      });
    };

    redrawConnections();

    window.addEventListener("resize", redrawConnections);
    window.addEventListener("scroll", redrawConnections);

    return () => {
      window.removeEventListener("resize", redrawConnections);
      window.removeEventListener("scroll", redrawConnections);
    };
  }, [connections]);

  return svgRef;
};

export default useConnections;
