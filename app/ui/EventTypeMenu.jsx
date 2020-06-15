import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Icon from '../components/Icon';


function EventTypeMenuContent({ loading, eventTypes, selected, toggleEvent }) {
  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <Container>
      {Object.entries(eventTypes).map(([id, eventType]) => (
        <Icon
          key={id}
          src={eventType.icon}
          alt={eventType.name}
          variant={id === selected ? 'primary' : 'light'}
          onClick={() => toggleEvent(id)}
          className="shadow-sm m-1"
        />
      ))}
    </Container>
  );
}


function EventTypeMenu({ loading, eventTypes, selected, toggleEvent }) {
  return (
    <Container fluid className="border border-dark h-100 p-2">
      <EventTypeMenuContent
        loading={loading}
        eventTypes={eventTypes}
        selected={selected}
        toggleEvent={toggleEvent}
      />
    </Container>
  );
}


export default EventTypeMenu;
