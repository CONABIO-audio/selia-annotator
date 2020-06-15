import React, { useContext } from 'react';
import AnnotationToolMenu from '../ui/AnnotationToolMenu';
import TypesContext from '../contexts/TypesContext';
import AnnotationsContext from '../contexts/AnnotationsContext';


function AnnotationToolMenuContainer(props) {
  const { annotators, annotationTypes } = useContext(TypesContext);
  const { annotator, annotationType } = useContext(AnnotationsContext);

  function selectAnnotationType(id) {
    annotationType.set(id);

    if (id in annotators) {
      annotator.set(annotators[id].id);
    }
  }

  return (
    <AnnotationToolMenu
      annotationTypes={annotationTypes}
      annotators={annotators}
      selected={annotationType.value}
      select={selectAnnotationType}
    />
  );
}


export default AnnotationToolMenuContainer;
