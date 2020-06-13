import React from 'react';

import Button from 'react-bootstrap/Button';


function AnnotationTypeButton(props) {
  const {
    annotationType,
    active,
    loading,
    ...extraProps
  } = props;

  return (
    <Button style={{width: '2.5em'}} className="border p-2 mx-1 shadow-sm" variant={active ? 'primary' : 'light'} {...extraProps}>
      <img className="w-100" src={annotationType.icon} alt={annotationType.name} />
    </Button>
  );
}

export default AnnotationTypeButton;
