import React, { useState, useContext, useEffect, useMemo } from 'react';
import Canvas from '../ui/Canvas';

import TypesContext from '../contexts/TypesContext';
import APIContext from '../contexts/APIContext';
import AnnotationsContext from '../contexts/AnnotationsContext';
import { useAnnotations } from './utils';


function getCurrentVisualizerInfo(itemInfo, types) {
  if (itemInfo.data) {
    const type = itemInfo.data.item_type.id;
    return types.visualizers[type];
  }
  return null;
}


function getCurrentAnnotatorInfo(annotations, types) {
  if (annotations.annotator.value) {
    const type = annotations.annotator.value;
    return types.annotators[type];
  }
  return null;
}

function EmptyPromise() {
  return new Promise((resolve, reject) => resolve(null));
}


function useVisualizerModule(url) {
  return useMemo(() => {
    if (url === null) return EmptyPromise();
    return import(/* webpackIgnore: true */url).then(() => Visualizer.default);
  }, [url]);
}


function useAnnotatorModule(url) {
  return useMemo(() => {
    if (url === null) return EmptyPromise();
    return import(/* webpackIgnore: true */url).then(() => AnnotatorTool.default);
  }, [url]);
}


function useVisualizer() {
  const { itemInfo } = useContext(APIContext);
  const typesContext = useContext(TypesContext);
  const visualizerInfo = getCurrentVisualizerInfo(itemInfo, typesContext);

  const [state, setState] = useState({
    loading: false,
    error: null,
    ready: false,
  });
  const [visualizer, setVisualizer] = useState({
    id: null,
    visualizer: null,
  });

  // Visualizer module information
  const moduleURL = visualizerInfo ? visualizerInfo.module : null;
  const id = visualizerInfo ? visualizerInfo.id : null;

  // Visualized item information
  const item = itemInfo.data ? itemInfo.data.id : null;
  const url = itemInfo.data ? itemInfo.data.download : null;

  // Dynamically import visualizer module.
  const componentPromise = useVisualizerModule(moduleURL);

  useEffect(() => {
    // Start loading
    setState({ loading: true, error: null, ready: false });

    componentPromise
      .then((Component) => {
        // When component is loaded mount visualizer on canvas.
        setVisualizer({
          id,
          visualizer: new Component({
            canvas: document.getElementById('visualizerCanvas'),
            toolbar: document.getElementById('visualizerToolbar'),
            itemInfo: { url },
            active: true,
          }),
        });

        // Set state to indicate that loading was successful
        setState({ loading: false, error: null, ready: true });
      })
      .catch((error) => {
        // If loading fails, save error
        setState({ loading: false, error: error.message, ready: false });
      });

    return () => {
      // Unmount the visualizer when done
      if (visualizer.visualizer !== null) {
        visualizer.visualizer.unmount();
      }

      // Reset state and components;
      setState({ loading: false, error: null, ready: false });
      setVisualizer({ id: null, visualizer: null });
    };
  }, [moduleURL, item]);

  return { state, component: visualizer.visualizer, id: visualizer.id };
}


function useAnnotator(visualizer) {
  const { itemInfo } = useContext(APIContext);
  const typesContext = useContext(TypesContext);
  const annotationsContext = useContext(AnnotationsContext);
  const annotatorInfo = getCurrentAnnotatorInfo(annotationsContext, typesContext);

  const [state, setState] = useState({
    loading: false,
    error: null,
    ready: false,
  });
  const [annotator, setAnnotator] = useState({
    id: null,
    annotator: null,
  });

  // Annotator module information
  const moduleURL = annotatorInfo ? annotatorInfo.module : null;
  const id = annotatorInfo ? annotatorInfo.id : null;

  // Visualized item information
  const item = itemInfo.data ? itemInfo.data.id : null;

  // Dynamically import Annotator module.
  const componentPromise = useAnnotatorModule(moduleURL);

  useEffect(() => {
    // Start loading only after visualizer is mounted
    if (visualizer.state.ready) {
      setState({ loading: true, error: null, ready: false });

      componentPromise
        .then((Component) => {
          // When component is loaded mount annotator on canvas.
          setAnnotator({
            id,
            annotator: new Component({
              canvas: document.getElementById('annotatorCanvas'),
              toolbar: document.getElementById('annotatorToolbar'),
              active: false,
              annotations: {},
              state: 'selected',
              visualizer: visualizer.component,
              setState: (oldState, newState) => {
                annotationsContext.state.set(newState);
                return newState;
              },
              registerAnnotation: (annotation) => {
                annotationsContext.annotation.set(annotation);
                const randomId = Math.floor(Math.random() * 10000).toString();
                return randomId;
              },
              updateAnnotation: (annotationId, annotation) => {
                annotationsContext.annotation.set(annotation);
                return annotation;
              },
              selectAnnotation: (annotationId) => {
                annotationsContext.selectedAnnotation.set(annotationId);
                return annotationId;
              },
              hoverOnAnnotation: (annotationId) => {
                annotationsContext.hoverAnnotation.set(annotationId);
                return annotationId;
              },
              deleteAnnotation: (annotationId) => {
                const couldDelete = annotationsContext.deleteAnnotation(annotationId);
                return couldDelete;
              },
            }),
          });

          // Set state to indicate that loading was successful
          setState({ loading: false, error: null, ready: true });
        })
        .catch((error) => {
          // If loading fails, save error
          setState({ loading: false, error: error.message, ready: false });
        });
    }

    return () => {
      // Unmount the annotator when done
      if (annotator.annotator !== null) {
        annotator.annotator.unmount();
      }

      // Reset state and components;
      setState({ loading: false, error: null, ready: false });
      setAnnotator({ id: null, annotator: null });
    };
  }, [moduleURL, item, visualizer.state.ready]);

  return { state, component: annotator.annotator, id: annotator.id };
}


function CanvasContainer(props) {
  const { state, selectedAnnotation, hoverAnnotation } = useContext(AnnotationsContext);

  // Load visualizer
  const visualizer = useVisualizer();

  // Load annotator
  const annotator = useAnnotator(visualizer);

  // Prepare annotations
  const itemAnnotations = useAnnotations();

  return (
    <Canvas
      annotator={annotator}
      annotations={itemAnnotations}
      state={state.value}
      selectedAnnotation={selectedAnnotation.value}
      hoverAnnotation={hoverAnnotation.value}
    />
  );
}


export default CanvasContainer;
