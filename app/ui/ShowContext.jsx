import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import APIContext from '../contexts/APIContext';
import AnnotationsContext from '../contexts/AnnotationsContext';
import TypesContext from '../contexts/TypesContext';


function ShowContext(props) {
  const apiContext = useContext(APIContext);
  const annotationsContext = useContext(AnnotationsContext);
  const typesContext = useContext(TypesContext);

  return (
    <Container>
      <Row className="w-100">
        <h4>API</h4>
        <p className="w-100 text-wrap">
          { JSON.stringify(apiContext) }
        </p>
      </Row>
      <Row>
        <h4>Types</h4>
        <p className="w-100 text-wrap">
          { JSON.stringify(typesContext) }
        </p>
      </Row>
      <Row>
        <h4>Annotations</h4>
        <p className="w-100 text-wrap">
          { JSON.stringify(annotationsContext) }
        </p>
      </Row>
    </Container>
  );
}

export default ShowContext;
