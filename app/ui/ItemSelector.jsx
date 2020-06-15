import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { LeftButton, RightButton } from '../components/Buttons';
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
    <Container fluid className="border border-dark p-2 h-100">
      <LeftButton
        className="mx-1"
        variant={index === 0 ? 'active' : 'light'}
        disabled={index === 0}
        onClick={() => setItem(items[index - 1])}
      />
      <RightButton
        className="mx-1"
        variant={index === length ? 'active' : 'light'}
        disabled={index === length}
        onClick={() => setItem(items[index + 1])}
      />
    </Container>
  );
}


export default ItemSelector;
