import React from 'react';


const AnnotationsContext = React.createContext({
  state: {
    value: 'select',
    set: null,
  },
  selectedAnnotation: {
    value: null,
    set: null,
  },
  hoverAnnotation: {
    value: null,
    set: null,
  },
  annotation: {
    value: null,
    set: null,
  },
  labels: {
    value: null,
    set: null,
  },
  eventType: {
    value: null,
    set: null,
  },
  annotationType: {
    value: null,
    set: null,
  },
  annotator: {
    value: null,
    set: null,
  },
  visualizer: {
    value: null,
    set: null,
  },
  visualizerConfiguration: {
    value: null,
    set: null,
  },
  registerAnnotation: null,
  updateAnnotation: null,
  deleteAnnotation: null,
});
AnnotationsContext.displayName = 'AnnotationsContext';


export default AnnotationsContext;
