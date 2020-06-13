import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AnnotatorContainer from '../containers/AnnotatorContainer';
import ToolbarContainer from '../containers/ToolbarContainer';
import CanvasContainer from '../containers/CanvasContainer';
import SidebarContainer from '../containers/SidebarContainer';

import ShowContext from './ShowContext';


function Annotator({ itemSelector }) {
  return (
    <AnnotatorContainer>
      <Container fluid>
        <Row className="justify-content-center">
          {itemSelector}
        </Row>
        <Row className="border border-dark">
          <ToolbarContainer />
        </Row>
        <Row>
          <Col className="border border-dark">
            <CanvasContainer />
          </Col>
          <Col className="border border-dark">
            <SidebarContainer />
          </Col>
        </Row>
        <Row>
          <ShowContext />
        </Row>
      </Container>
    </AnnotatorContainer>
  );
}


export default Annotator;
