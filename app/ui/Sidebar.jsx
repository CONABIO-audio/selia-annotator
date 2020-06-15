import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import APIContext from '../contexts/APIContext';
import AnnotationListContainer from '../containers/AnnotationListContainer';


function Sidebar(props) {
  const api = useContext(APIContext);

  return (
    <Container>
      <AnnotationListContainer annotations={api.annotations} />
    </Container>
  );
}


export default Sidebar;
