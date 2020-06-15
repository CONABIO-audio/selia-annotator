import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AnnotatorCanvas, VisualizerCanvas } from '../components/Canvas';


function useVisualizer(visualizer, url) {
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
  useEffect(() => {
    if (vis !== null) {
      // Clear all event listeners and the visualizer when unmounted.
      return () => {
        if (vis !== null) {
          vis.unmount();
          setVis(null);
        }
      };
    }
  }, [vis, url]);

  return vis;
}


function useAnnotator(vis, annotator, annotations) {
  const [ann, setAnn] = useState(null);

  // Add annotator to corresponding canvas when ready
  useEffect(() => {
    if (vis !== null && ann === null && annotator.component !== null) {
      const currentAnnotator = annotator.component({
        canvas: document.getElementById('annotatorCanvas'),
        toolbar: document.getElementById('annotatorToolbar'),
        active: false,
        annotations,
        state: 'select',
        visualizer: vis,
      });

      setAnn(currentAnnotator);
    }
  }, [vis, ann, annotator, annotations]);

  // Update annotations when required
  useEffect(() => {
    if (ann !== null) {
      console.log({
        message: 'Should update annotations',
        annotations,
        ann,
      });
      // ann.setAnnotations(annotations);
    }
  }, [ann, annotations]);

  // Unmount the annotator when selected annotation tool has changed
  useEffect(() => {
    if (ann !== null) {
      return () => {
        if (ann !== null) {
          ann.unmount();
          setAnn(null);
        }
      };
    }
  }, [annotator.component]);

  return ann;
}


function Canvas(props) {
  const {
    url,
    visualizer,
    annotator,
    annotations,
    changeState,
  } = props;

  const vis = useVisualizer(visualizer, url);
  const ann = useAnnotator(vis, annotator, annotations);

  // Update activators
  useEffect(() => {
    if (vis !== null && ann !== null) {
      vis.setActivator(() => ann.deactivate());
      ann.setActivator(() => vis.deactivate());
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
