import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import List from '../components/List';
import AnnotationListItem from '../components/AnnotationListItem';


function AnnotationList(props) {
  const { annotations, loading, types, selectedAnnotation, hoverAnnotation } = props;

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
        <AnnotationListItem
          key={id}
          annotation={annotation}
          types={types}
          selected={id === selectedAnnotation.value}
          hover={id === hoverAnnotation.value}
          onMouseEnter={() => {
            if (id !== hoverAnnotation) {
              hoverAnnotation.set(id);
            }
          }}
          onMouseLeave={() => hoverAnnotation.set(null)}
        />
      ))}
    </List>
  );
}


export default AnnotationList;
