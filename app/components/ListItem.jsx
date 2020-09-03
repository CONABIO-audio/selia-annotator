import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function ListItem({ key, item, children, selected, hover, onMouseEnter, onMouseLeave }) {
  const className = hover ? 'my-3 list_item' : 'my-3 list_item';

  return (
    <Row
      key={key}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
    >
      <Container className={className}>
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
