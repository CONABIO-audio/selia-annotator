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
        <Row className="border border-dark">
          <ToolbarContainer itemSelector={itemSelector} />
        </Row>
        <Row>
          <Col xl={8} lg={7} md={6} className="border border-dark">
            <CanvasContainer />
          </Col>
          <Col xl={4} lg={5} md={6} className="border border-dark">
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
