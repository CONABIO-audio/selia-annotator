import React from 'react';


const visualizerCanvasStyle = {
  display: 'block',
  position: 'absolute',
  height: '100%',
  width: '100%',
};


const annotatorCanvasStyle = {
  ...visualizerCanvasStyle,
  pointerEvents: 'none',
  zIndex: 3,
};


function AnnotatorCanvas({ id }) {
  return <canvas id={id} style={annotatorCanvasStyle} />;
}


function VisualizerCanvas({ id }) {
  return <canvas id={id} style={visualizerCanvasStyle} />;
}


export { VisualizerCanvas, AnnotatorCanvas };
