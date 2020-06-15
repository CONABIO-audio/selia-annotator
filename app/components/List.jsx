import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


function List({ children }) {
  return (
    <Container>
      <Col>
        {children}
      </Col>
    </Container>
  );
}


export default List;
