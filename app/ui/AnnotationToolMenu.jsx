import React, { useContext } from 'react';

import TypesContext from '../contexts/TypesContext';
import AnnotationsContext from '../contexts/AnnotationsContext';
import AnnotationTypeButton from '../components/AnnotationTypeButton';


function AnnotationToolMenu(props) {
  const { annotators, annotationTypes } = useContext(TypesContext);
  const { annotator, annotationType } = useContext(AnnotationsContext);

  const buttons = (
    Object.entries(annotators)
      .map(([id, otherAnnotator]) => {
        const otherAnnotationType = annotationTypes[id];

        return (
          <AnnotationTypeButton
            key={id}
            annotationType={otherAnnotationType}
            active={id === annotator.value}
            onClick={() => {
              annotator.set(otherAnnotator.id.toString());
              annotationType.set(id);
            }}
          />
        );
      })
  );

  return <div>{buttons}</div>;
}


export default AnnotationToolMenu;
