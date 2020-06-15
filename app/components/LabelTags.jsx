import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import LabelTag from './LabelTag';


function LabelTags({ labels }) {
  const [hoverLabel, setHoverLabel] = useState(null);

  return (
    <Container fluid>
      {labels.map((label) => (
        <LabelTag
          key={label.id}
          label={label}
          onMouseOver={() => setHoverLabel(label.id)}
          onFocus={() => setHoverLabel(label.id)}
          onBlur={() => setHoverLabel(null)}
          onMouseOut={() => setHoverLabel(null)}
          variant={label.id === hoverLabel ? 'secondary' : 'dark'}
        />
      ))}
    </Container>
  );
}


export default LabelTags;
