import React from 'react';
import Container from 'react-bootstrap/Container';


import AnnotationTypeButton from '../components/AnnotationTypeButton';


function AnnotationToolMenu(props) {
  const {
    annotationTypes,
    annotators,
    selected,
    select,
  } = props;

  const buttons = Object.entries(annotationTypes)
    .map(([id, type]) => (
      <AnnotationTypeButton
        key={id}
        annotationType={type}
        active={id === selected}
        onClick={() => select(id)}
      />
    ));

  return (
    <Container fluid className="p-2 h-100 border border-dark">
      {buttons}
    </Container>
  );
}


export default AnnotationToolMenu;
