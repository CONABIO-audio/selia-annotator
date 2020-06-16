import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AnnotationsContext from '../contexts/AnnotationsContext';
import AnnotationToolMenuContainer from '../containers/AnnotationToolMenuContainer';
import EventTypeMenuContainer from '../containers/EventTypeMenuContainer';


function Toolbar({ itemSelector }) {
  const { state: { value: state } } = useContext(AnnotationsContext);

  return (
    <Container fluid>
      <Row>
        <Col>
          <AnnotationToolMenuContainer />
        </Col>
        <Col>
          {state}
        </Col>
        <Col>
          {itemSelector}
        </Col>
        <Col>
          <EventTypeMenuContainer />
        </Col>
      </Row>
    </Container>
  );
}


export default Toolbar;
