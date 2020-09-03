import React, { useContext, useState, useEffect } from 'react';
import APIContext from '../contexts/APIContext';
import TypesContext from '../contexts/TypesContext';
import AnnotationsContext from '../contexts/AnnotationsContext';
import { STATES } from './utils';


function validateAnnotation(annotation) {
  return true;
}


function AnnotatorContainer({ children }) {
  const API = useContext(APIContext);
  const { annotators, annotationTypes } = useContext(TypesContext);

  const [item, setItem] = useState(null);
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

  // Select the first annotation type by default
  useEffect(() => {
    console.log('Changing item');
    const keys = Object.keys(annotationTypes);
    if (keys.length > 0) {
      const [firstAnnotationType] = keys;
      setAnnotationType(firstAnnotationType);
      setAnnotator(annotators[firstAnnotationType].id.toString());
    }
  }, [annotators, annotationTypes]);

  // Reset state on change of item
  useEffect(() => {
    setItem(API.item);
    setAnnotatorState(STATES.SELECT);
    setSelectedAnnotation(null);
    setHoverAnnotation(null);
  }, [API.item]);

  // Reset annotation fields on change of selected annotation.
  useEffect(() => {
    setAnnotation(null);
    setLabels(null);
    setCertainty(null);
    setQuality(null);
    setCommentaries(null);
    setVisualizerConfiguration(null);
  }, [selectedAnnotation]);

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
    const newAnnotation = buildAnnotation();
    const [isValid, errors] = validateAnnotation(newAnnotation);

    if (!isValid) return [isValid, errors];

    const response = API.createAnnotation(annotation);

    return [isValid, response];
  }

  function updateAnnotation() {
    const newAnnotation = buildAnnotation();
    const [isValid, errors] = validateAnnotation(newAnnotation);

    if (!isValid) return [isValid, errors];

    const response = API.updateAnnotation(selectedAnnotation, annotation);
    return [isValid, response];
  }

  function deleteAnnotation() {
    return API.deleteAnnotation(selectedAnnotation, annotation);
  }

  const value = {
    item: {
      value: item,
      set: setItem,
    },
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
