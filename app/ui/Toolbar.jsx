import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AnnotationToolMenu from './AnnotationToolMenu';


function Toolbar(props) {
  return (
    <Container fluid>
      <Col>
        <AnnotationToolMenu />
      </Col>
    </Container>
  );
}


export default Toolbar;
