import React from 'react';
import Badge from 'react-bootstrap/Badge';


function LabelTag({ label, ...otherProps }) {
  return (
    <Badge
      pill
      className="mx-1"
      style={{ cursor: 'pointer' }}
      {...otherProps}
    >
      { label.value }
    </Badge>
  );
}


export default LabelTag;
