import React, { useEffect, useState, useLayoutEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AnnotatorCanvas, VisualizerCanvas } from '../components/Canvas';


function useVisualizer(url, visualizer) {
  const [vis, setVis] = useState(null);

  // Mount the visualizer to corresponding canvas
  useEffect(() => {
    if (vis === null && visualizer.component !== null) {
      const currentVisualizer = visualizer.component({
        canvas: document.getElementById('visualizerCanvas'),
        toolbar: document.getElementById('visualizerToolbar'),
        itemInfo: { url },
        active: true,
      });

      setVis(currentVisualizer);
    }
  }, [url, vis, visualizer]);

  // Unmount the visualizer when the url changes;
  useEffect(() => () => {
    if (vis !== null) {
      vis.unmount();
      setVis(null);
    }
  }, [vis, url]);

  return vis;
}


function useAnnotator(props) {
  const [ann, setAnn] = useState(null);
  const [annId, setAnnId] = useState(null);

  const {
    vis, annotator, annotations, setState,
    setAnnotation, setSelectedAnnotation,
    setHoverAnnotation, deleteAnnotation,
    selectedAnnotation, state, item,
    hoverAnnotation,
  } = props;

  // Unmount the annotator when selected annotation tool has changed
  useEffect(() => {
    if (ann !== null) {
      console.log('Unmount annotator');
      ann.unmount();
      setAnn(null);
      setAnnId(null);
    }
  }, [item, annotator.id]);

  // Add annotator to corresponding canvas when ready
  useEffect(() => {
    if (vis !== null && annId === null && annotator.component !== null) {
      console.log('Mount annotator')
      const currentAnnotator = annotator.component({
        canvas: document.getElementById('annotatorCanvas'),
        toolbar: document.getElementById('annotatorToolbar'),
        active: false,
        annotations,
        state: 'selected',
        visualizer: vis,
        setState: (oldState, newState) => {
          setState(newState);
          return newState;
        },
        registerAnnotation: (annotation) => {
          setAnnotation(annotation);
          const randomId = Math.floor(Math.random() * 10000).toString();
          return randomId;
        },
        updateAnnotation: (annotationId, annotation) => {
          setAnnotation(annotation);
          return annotation;
        },
        selectAnnotation: (annotationId) => {
          setSelectedAnnotation(annotationId);
          return annotationId;
        },
        hoverOnAnnotation: (annotationId) => {
          setHoverAnnotation(annotationId);
          return annotationId;
        },
        deleteAnnotation: (annotationId) => {
          const couldDelete = deleteAnnotation(annotationId);
          return couldDelete;
        },
      });

      setAnn(currentAnnotator);
      setAnnId(annotator.id);
    }
  }, [
    vis, ann, annotator, annotations, setState, setAnnotation,
    setSelectedAnnotation, setHoverAnnotation, deleteAnnotation,
    annId,
  ]);

  // Update annotations when required
  useEffect(() => {
    if (annId !== null) {
      console.log({
        message: 'Set annotations',
        annId,
        annotations,
      });
      ann.setAnnotations(annotations);
    }
  }, [annId, annotations]);

  // Update selected annotation when changed
  useEffect(() => {
    if (annId !== null) {
      if (selectedAnnotation !== ann.getSelectedAnnotation()) {
        ann.setSelectedAnnotation(selectedAnnotation);
      }
    }
  }, [annId, selectedAnnotation]);

  // Update hover annotation when changed
  useEffect(() => {
    if (annId !== null) {
      if (hoverAnnotation !== ann.getHoverOnAnnotation()) {
        ann.setHoverOnAnnotation(hoverAnnotation);
      }
    }
  }, [annId, hoverAnnotation]);

  // Update annotator state when changed
  useEffect(() => {
    if (annId !== null) {
      if (state !== ann.getState()) {
        ann.forceState(state);
      }
    }
  }, [annId, state]);

  return ann;
}


function Canvas(props) {
  const {
    url,
    visualizer,
    ...annotatorProps
  } = props;

  const vis = useVisualizer(url, visualizer);
  const ann = useAnnotator({ vis, ...annotatorProps });

  // Update activators
  useEffect(() => {
    if (vis !== null && ann !== null) {
      vis.setActivator(() => {
        ann.deactivate();
        return true;
      });
      ann.setActivator(() => {
        vis.deactivate();
        return true;
      });
    }
  }, [vis, ann]);

  return (
    <Container fluid className="border border-dark">
      <Row className="border border-dark">
        <Col id="annotatorToolbar" />
      </Row>
      <Row className="border border-dark">
        <Col id="visualizerToolbar" />
      </Row>
      <Row className="border border-dark">
        <Container className="p-0 border border-dark" fluid style={{ height: '30em', position: 'relative' }}>
          <VisualizerCanvas id="visualizerCanvas" />
          <AnnotatorCanvas id="annotatorCanvas" />
        </Container>
      </Row>
    </Container>
  );
}


export default Canvas;
