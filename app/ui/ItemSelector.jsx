import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import { updateURLParameter } from './utils';


function ItemSelector({ item, items, setItem }) {
  const index = items.indexOf(item);
  const length = items.length - 1;

  const handleKeyPress = (event) => {
    if (!event.shiftKey) return;
    if (event.key === 'ArrowRight' && index + 1 < length) setItem(items[index + 1]);
    if (event.key === 'ArrowLeft' && index - 1 > 0) setItem(items[index - 1]);
  };

  // Add navigation with keys.
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [item]);

  // Change URL param to reflect changes in item.
  useEffect(() => {
    window.history.pushState('', '', updateURLParameter(window.location.href, 'pk', item));
  }, [item]);

  return (
    <Row>
      <Button
        className="mx-1"
        variant={index === 0 ? 'active' : 'light'}
        disabled={index === 0}
        onClick={() => setItem(items[index - 1])}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      <Button
        className="mx-1"
        variant={index === length ? 'active' : 'light'}
        disabled={index === length}
        onClick={() => setItem(items[index + 1])}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Row>
  );
}


export default ItemSelector;
