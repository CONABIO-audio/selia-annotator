import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import List from '../components/List';
import AnnotationListItem from '../components/AnnotationListItem';


function AnnotationList(props) {
  const { annotations, loading, types } = props;

  if (loading) {
    return (
      <List>
        <Spinner animation="border" role="status" />
      </List>
    );
  }

  return (
    <List>
      {Object.entries(annotations).map(([id, annotation]) => (
        <AnnotationListItem key={id} annotation={annotation} types={types} />
      ))}
    </List>
  );
}


export default AnnotationList;
