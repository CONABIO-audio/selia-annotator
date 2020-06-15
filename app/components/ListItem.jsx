import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function ListItem({ key, item, children }) {
  return (
    <Row key={key}>
      <Container className="my-3 list_item">
        <Row className="px-3">
          { children }
        </Row>
        <Row className="px-4 mt-1">
          <small className="text-muted w-100 text-right">
            { item.created_on }
          </small>
        </Row>
      </Container>
    </Row>
  );
}


export default ListItem;
