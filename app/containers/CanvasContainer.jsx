import React, { useState, useContext, useEffect } from 'react';
import Canvas from '../ui/Canvas';

import TypesContext from '../contexts/TypesContext';
import APIContext from '../contexts/APIContext';
import AnnotationsContext from '../contexts/AnnotationsContext';


function hasAttr(obj, attr) {
  return Object.hasOwnProperty.call(obj, attr);
}


function getCurrentVisualizerInfo(api, types) {
  if (api.itemInfo.data) {
    const type = api.itemInfo.data.item_type.id;
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
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (componentInfo !== null) {
      const { id } = componentInfo;

      if (!hasAttr(store, id)) {
        setLoading(true);
        setError(null);
        setComponent(null);

        import(/* webpackIgnore: true */componentInfo.module)
          .then((module) => {
            function getCurrentComponent(props) {
              return new Visualizer.default(props);
            }

            setStore((prevStore) => ({ ...prevStore, [id]: () => getCurrentComponent }));
            setComponent(() => getCurrentComponent);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            setError(e.message);
          });
      } else {
        setLoading(false);
        setError(null);
        setComponent(store[id]);
      }
    }
  }, [componentInfo, store]);

  return { loading, error, component };
}


function useAnnotator(componentInfo) {
  const [store, setStore] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (componentInfo !== null) {
      const { id } = componentInfo;

      if (!hasAttr(store, id)) {
        setLoading(true);
        setError(null);
        setComponent(null);

        import(/* webpackIgnore: true */componentInfo.module)
          .then((module) => {
            function getCurrentComponent(props) {
              return new AnnotatorTool.default(props);
            }

            setStore((prevStore) => ({ ...prevStore, [id]: () => getCurrentComponent }));
            setComponent(() => getCurrentComponent);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            setError(e.message);
          });
      } else {
        setLoading(false);
        setError(null);
        setComponent(store[id]);
      }
    }
  }, [componentInfo, store]);

  return { loading, error, component };
}


function CanvasContainer(props) {
  const apiContext = useContext(APIContext);
  const typesContext = useContext(TypesContext);
  const annotationsContext = useContext(AnnotationsContext);

  // Load visualizer
  const visualizerInfo = getCurrentVisualizerInfo(apiContext, typesContext);
  const visualizer = useVisualizer(visualizerInfo);

  // Load annotator
  const annotatorInfo = getCurrentAnnotatorInfo(annotationsContext, typesContext);
  const annotator = useAnnotator(annotatorInfo);

  const url = apiContext.itemInfo.data === null
    ? null
    : apiContext.itemInfo.data.download;

  return (
    <Canvas
      url={url}
      visualizer={visualizer}
      annotator={annotator}
    />
  );
}


export default CanvasContainer;
