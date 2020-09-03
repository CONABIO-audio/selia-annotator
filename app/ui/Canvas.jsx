import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AnnotatorCanvas, VisualizerCanvas } from '../components/Canvas';


function Canvas(props) {
  const { annotator, state, annotations, selectedAnnotation, hoverAnnotation  } = props;

  useEffect(() => {
    if (annotator.component !== null) {
      if (annotator.component.state !== state) {
        console.log('Setting state');
        annotator.component.forceState(state);
      }
    }
  }, [annotator.component, state]);

  useEffect(() => {
    if (annotator.component !== null) {
      console.log('Setting annotations');
      annotator.component.setAnnotations(annotations);
    }
  }, [annotator.component, annotations]);

  useEffect(() => {
    if (annotator.component !== null) {
      if (annotator.component.getSelectedAnnotation() !== selectedAnnotation) {
        console.log('Setting selected annotation');
        annotator.component.setSelectedAnnotation(selectedAnnotation);
      }
    }
  }, [annotator.component, selectedAnnotation])

  useEffect(() => {
    if (annotator.component !== null) {
      console.log(hoverAnnotation)
      if (annotator.component.getHoverOnAnnotation() !== hoverAnnotation) {
        console.log('Setting hover on annotation');
        annotator.component.setHoverOnAnnotation(hoverAnnotation);
      }
    }
  }, [annotator.component, hoverAnnotation])

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
