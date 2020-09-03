import React, { useContext } from 'react';
import APIContext from '../contexts/APIContext';
import TypesContext from '../contexts/TypesContext';
import AnnotationList from '../ui/AnnotationList';


function AnnotationListContainer(props) {
  // Prepare annotations
  const { selectedAnnotation, hoverAnnotation } = props;
  const { annotations } = useContext(APIContext);
  const { annotationTypes, eventTypes } = useContext(TypesContext);

  return (
    <AnnotationList
      annotations={annotations.data}
      loading={annotations.loading}
      types={{
        annotations: annotationTypes,
        events: eventTypes,
      }}
      selectedAnnotation={selectedAnnotation}
      hoverAnnotation={hoverAnnotation}
    />
  );
}

export default AnnotationListContainer;
