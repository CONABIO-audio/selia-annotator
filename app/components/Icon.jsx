import React from 'react';
import Button from 'react-bootstrap/Button';


function Icon(props) {
  const { src, alt, width = '2.5em', className, ...extraProps } = props;

  return (
    <Button
      style={{ width }}
      className={'p-1 ' + className}
      {...extraProps}
    >
      <img className="w-100" src={src} alt={alt} />
    </Button>
  );
}


export default Icon;
