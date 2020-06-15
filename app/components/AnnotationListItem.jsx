import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListItem from './ListItem';
import LabelTags from './LabelTags';
import Icon from './Icon';
import { EditButton, DeleteButton } from './Buttons';



function AnnotationItem({ annotation, types: { annotations, events } }) {
  const { annotation_type, event_type } = annotation;
  const annotationType = annotations[annotation_type];
  const eventType = events[event_type];

  return (
    <Row>
      <Col lg={2} md={2} sm={2}>
        <Icon
          src={annotationType.icon}
          alt={annotationType.name}
          width="4em"
          variant="link"
          className="text-muted"
        />
      </Col>
      <Col lg={2} md={2} sm={2}>
        <Icon
          src={eventType.icon}
          alt={eventType.name}
          width="4em"
          variant="link"
          className="text-muted"
        />
      </Col>
      <Col lg={7} md={7} sm={7}>
        <LabelTags labels={annotation.labels} />
      </Col>
      <Col lg={1} md={1} sm={1}>
        <Row>
          <EditButton variant="link" className="text-primary" />
        </Row>
        <Row>
          <DeleteButton variant="link" className="text-danger" />
        </Row>
      </Col>
    </Row>
  );
}


function AnnotationListItem({ annotation, types }) {
  return (
    <ListItem item={annotation}>
      <AnnotationItem annotation={annotation} types={types} />
    </ListItem>
  );
}


export default AnnotationListItem;
