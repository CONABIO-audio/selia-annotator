import React, { useContext, useState } from 'react';
import APIContext from '../contexts/APIContext';
import AnnotationsContext from '../contexts/AnnotationsContext';
import { STATES } from './utils';


function validateAnnotation(annotation) {
  return true;
}


function AnnotatorContainer({ children }) {
  const [annotatorState, setAnnotatorState] = useState(STATES.SELECT);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [hoverAnnotation, setHoverAnnotation] = useState(null);
  const [annotation, setAnnotation] = useState(null);
  const [labels, setLabels] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [annotationType, setAnnotationType] = useState(null);
  const [annotator, setAnnotator] = useState(null);
  const [visualizer, setVisualizer] = useState(null);
  const [certainty, setCertainty] = useState(null);
  const [quality, setQuality] = useState(null);
  const [commentaries, setCommentaries] = useState(null);
  const [visualizerConfiguration, setVisualizerConfiguration] = useState(null);

  const API = useContext(APIContext);

  function buildAnnotation() {
    return {
      annotation,
      labels,
      certainty,
      quality,
      commentaries,
      visualizer,
      event_type: eventType,
      visualizer_configuration: visualizerConfiguration,
      annotation_type: annotationType,
    };
  }

  function createAnnotation() {
    if (annotatorState !== STATES.CREATE) throw Error('The app is not in an create state.');

    const newAnnotation = buildAnnotation();
    const [isValid, errors] = validateAnnotation(newAnnotation);

    if (!isValid) return [isValid, errors];

    const response = API.createAnnotation(annotation);
    return [isValid, response];
  }

  function updateAnnotation() {
    if (annotatorState !== STATES.EDIT) throw Error('The app is not in an edit state.');
    if (selectedAnnotation === null) throw Error('No selected annotation to update');

    const newAnnotation = buildAnnotation();
    const [isValid, errors] = validateAnnotation(newAnnotation);

    if (!isValid) return [isValid, errors];

    const response = API.updateAnnotation(selectedAnnotation, annotation);
    return [isValid, response];
  }

  function deleteAnnotation() {
    if (annotatorState !== STATES.CREATE) throw Error('The app is not in an delete state.');
    if (selectedAnnotation === null) throw Error('No selected annotation to delete');

    return API.deleteAnnotation(selectedAnnotation, annotation);
  }

  const value = {
    state: {
      value: annotatorState,
      set: setAnnotatorState,
    },
    selectedAnnotation: {
      value: selectedAnnotation,
      set: setSelectedAnnotation,
    },
    hoverAnnotation: {
      value: hoverAnnotation,
      set: setHoverAnnotation,
    },
    annotation: {
      value: annotation,
      set: setAnnotation,
    },
    labels: {
      value: labels,
      set: setLabels,
    },
    eventType: {
      value: eventType,
      set: setEventType,
    },
    annotationType: {
      value: annotationType,
      set: setAnnotationType,
    },
    annotator: {
      value: annotator,
      set: setAnnotator,
    },
    visualizer: {
      value: visualizer,
      set: setVisualizer,
    },
    visualizerConfiguration: {
      value: visualizerConfiguration,
      set: setVisualizerConfiguration,
    },
    certainty: {
      value: certainty,
      set: setCertainty,
    },
    quality: {
      value: quality,
      set: setQuality,
    },
    commentaries: {
      value: commentaries,
      set: setCommentaries,
    },
    createAnnotation,
    updateAnnotation,
    deleteAnnotation,
  };

  return (
    <AnnotationsContext.Provider value={value}>
      { children }
    </AnnotationsContext.Provider>
  );
}


export default AnnotatorContainer;
