import React, { useRef, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
}


function Canvas(props) {
  const {
    url,
    visualizer,
    annotator,
  } = props;

  const [vis, setVis] = useState(null);
  const [ann, setAnn] = useState(null);

  const [visCanvas, setVisCanvas] = useState(null);
  const [annCanvas, setAnnCanvas] = useState(null);

  const visualizerRef = useRef();
  const annotatorRef = useRef();

  // Create new canvas for visualizer and annotator when item
  // changes.
  useEffect(() => {
    setVisCanvas(<canvas id="visualizerCanvas" ref={visualizerRef} style={visualizerCanvasStyle} />);
    setAnnCanvas(<canvas id="annotatorCanvas" ref={annotatorRef} style={annotatorCanvasStyle} />);
  }, [url]);

  // Add visualizer to corresponding canvas
  useEffect(() => {
    if (vis === null && visualizer.component !== null && visCanvas !== null) {
      const currentVisualizer = visualizer.component({
        canvas: visualizerRef.current,
        itemInfo: { url },
        active: true,
      });

      setVis(currentVisualizer);
    }

    // Clear all event listeners and the visualizer when unmounted.
    return () => {
      if (vis !== null) {
        vis.unmount();
        setVis(null);
      }
    };
  }, [url, vis, visualizer, visCanvas]);

  // Add annotator to corresponding canvas when ready
  useEffect(() => {
    if (vis !== null && ann === null && annotator.component !== null && annCanvas !== null) {
      const currentAnnotator = annotator.component({
        canvas: annotatorRef.current,
        active: false,
        state: 'select',
        visualizer: vis,
      });

      setAnn(currentAnnotator);
    }

    // Clear all event listeners when unmounted.
    return () => {
      if (ann !== null) {
        ann.unmount();
        setAnn(null);
      }
    };
  }, [vis, ann, annotator, annCanvas]);

  // Update activators when annotator and visualizer have loaded;
  useEffect(() => {
    if (vis !== null && ann !== null) {
      vis.activator = () => {
        ann.deactivate();
        vis.activate();
      };

      ann.activator = () => {
        vis.deactivate();
        ann.activate();
      };
    }
  }, [vis, ann]);

  return (
    <Container>
      <Row>
        {ann !== null ? ann.renderToolbar() : 'Annotator Toolbar'}
      </Row>
      <Row>
        {vis !== null ? vis.renderToolbar() : 'Visualizer Toolbar'}
      </Row>
      <Row>
        <Container className="p-0" fluid style={{ height: '30em', position: 'relative' }}>
          {visCanvas}
          {annCanvas}
        </Container>
      </Row>
    </Container>
  );
}


export default Canvas;
