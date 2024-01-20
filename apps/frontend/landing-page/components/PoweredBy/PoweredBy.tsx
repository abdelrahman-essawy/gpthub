'use client';
import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Text, Line } from 'react-konva';

// ... (previous code)

const PoweredBy = () => {
  const lineRef = useRef(); // Ref to store the Line component

  useEffect(() => {
    const line = lineRef.current;

    let frameCount = 0;
    const period = 100; // Time period for one complete animation cycle in milliseconds

    const animateLine = () => {
      // Calculate color based on the position of the light along the line
      const lightPosition = (frameCount % period) / period;
      const lightPassColor = getColor(lightPosition);
      line.stroke(lightPassColor);

      frameCount++;

      // Request the next animation frame if the component is still mounted
      if (lineRef.current) {
        requestAnimationFrame(animateLine);
      }
    };

    const getColor = (position) => {
      const opacity = Math.abs(position - 0.5) * 2; // Double the opacity for a sharper transition
      return `rgba(173, 216, 230, ${1 - opacity})`; // Light blue color with dynamic opacity
    };

    // Start the animation
    animateLine();

    return () => {
      // Cleanup function if needed
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Some text on canvas" fontSize={15} />

        {/* Line with animation */}
        <Line
          ref={lineRef}
          points={[5, 70, 100, 70, 200, 70, 300, 70, 500, 70, 700, 70, 800, 70, 900, 70]}
          stroke="green"
          strokeWidth={2}
          lineJoin="round"
          dash={[10, 2]}
          transformsEnabled="position"
        />
      </Layer>
    </Stage>
  );
};

export default PoweredBy;
