import React, { useContext } from 'react';
import EventTypeMenu from '../ui/EventTypeMenu';

import TypesContext from '../contexts/TypesContext';
import APIContext from '../contexts/APIContext';
import AnnotationsContext from '../contexts/AnnotationsContext';


function EventTypeMenuContainer(props) {
  const { itemTypes } = useContext(TypesContext);
  const { itemInfo: { data: itemInfo, loading } } = useContext(APIContext);
  const { eventType } = useContext(AnnotationsContext);

  let allowedEventTypes = {};
  if (!loading && itemInfo !== null) {
    const currentItemType = itemInfo.item_type.id;
    const itemTypeInfo = itemTypes[currentItemType];
    allowedEventTypes = itemTypeInfo.event_types;
  }

  function toggleEvent(id) {
    if (id === eventType.value) {
      eventType.set(null);
    } else {
      eventType.set(id);
    }
  }

  return (
    <EventTypeMenu
      loading={loading}
      eventTypes={allowedEventTypes}
      selected={eventType.value}
      toggleEvent={toggleEvent}
    />
  );
}


export default EventTypeMenuContainer
