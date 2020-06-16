import React, { useState, useContext, useEffect } from 'react';
import Canvas from '../ui/Canvas';

import TypesContext from '../contexts/TypesContext';
import APIContext from '../contexts/APIContext';
import AnnotationsContext from '../contexts/AnnotationsContext';
import { hasAttr, useAnnotations } from './utils';


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


function useVisualizer(componentInfo) {
  const [store, setStore] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (componentInfo !== null) {
      const { id: visId } = componentInfo;

      if (!hasAttr(store, visId)) {
        setLoading(true);
        setError(null);
        setComponent(null);
        setId(null);

        import(/* webpackIgnore: true */componentInfo.module)
          .then((module) => {
            function getCurrentComponent(props) {
              return new Visualizer.default(props);
            }

            setStore((prevStore) => ({ ...prevStore, [visId]: () => getCurrentComponent }));
            setComponent(() => getCurrentComponent);
            setId(visId);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            setError(e.message);
          });
      } else {
        setLoading(false);
        setError(null);
        setId(visId);
        setComponent(store[visId]);
      }
    }
  }, [componentInfo, store]);

  return { loading, error, component, id };
}


function useAnnotator(componentInfo) {
  const [store, setStore] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (componentInfo !== null) {
      const { id: annId } = componentInfo;

      if (!hasAttr(store, annId)) {
        setLoading(true);
        setError(null);
        setComponent(null);
        setId(null);

        import(/* webpackIgnore: true */componentInfo.module)
          .then((module) => {
            function getCurrentComponent(props) {
              return new AnnotatorTool.default(props);
            }

            setStore((prevStore) => ({ ...prevStore, [annId]: () => getCurrentComponent }));
            setComponent(() => getCurrentComponent);
            setLoading(false);
            setId(annId);
          })
          .catch((e) => {
            setLoading(false);
            setError(e.message);
          });
      } else {
        setLoading(false);
        setError(null);
        setId(annId);
        setComponent(store[annId]);
      }
    }
  }, [componentInfo, store]);

  return { loading, error, component, id };
}


function CanvasContainer(props) {
  const { itemInfo } = useContext(APIContext);
  const typesContext = useContext(TypesContext);
  const annotationsContext = useContext(AnnotationsContext);

  // Load visualizer
  const visualizerInfo = getCurrentVisualizerInfo(itemInfo, typesContext);
  const visualizer = useVisualizer(visualizerInfo);

  // Load annotator
  const annotatorInfo = getCurrentAnnotatorInfo(annotationsContext, typesContext);
  const annotator = useAnnotator(annotatorInfo);

  // Get item url
  const url = itemInfo.data === null
    ? null
    : itemInfo.data.download;

  // Prepare annotations
  const itemAnnotations = useAnnotations();

  return (
    <Canvas
      url={url}
      visualizer={visualizer}
      annotator={annotator}
      annotations={itemAnnotations}
      item={annotationsContext.item.value}
      setState={annotationsContext.state.set}
      state={annotationsContext.state.value}
      selectedAnnotation={annotationsContext.selectedAnnotation.value}
      setSelectedAnnotation={annotationsContext.selectedAnnotation.set}
      hoverAnnotation={annotationsContext.hoverAnnotation.value}
      setHoverAnnotation={annotationsContext.hoverAnnotation.set}
      setAnnotation={annotationsContext.annotation.set}
      deleteAnnotation={annotationsContext.deleteAnnotation}
    />
  );
}


export default CanvasContainer;
