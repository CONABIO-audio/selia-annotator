import React from 'react';
import TypesContext from '../contexts/TypesContext';


function TypesContainer(props) {
  const {
    items,
    itemTypes,
    annotationTypes,
    children,
    annotators,
    visualizers,
  } = props;

  const itemTypesInfo = {};
  const eventTypesInfo = {};
  const annotationTypesInfo = {};

  itemTypes.forEach((itemTypeInfo) => {
    itemTypesInfo[itemTypeInfo.id] = itemTypeInfo;

    itemTypeInfo.event_types.forEach((eventTypeInfo) => {
      if (!eventTypesInfo.hasOwnProperty(eventTypeInfo.id)) {
        eventTypesInfo[eventTypeInfo.id] = eventTypeInfo;
      }
    });
  });

  annotationTypes.forEach((annotationTypeInfo) => {
    annotationTypesInfo[annotationTypeInfo.id] = annotationTypeInfo;
  });

  const value = {
    items,
    annotators,
    visualizers,
    itemTypes: itemTypesInfo,
    eventTypes: eventTypesInfo,
    annotationTypes: annotationTypesInfo,
  };

  return (
    <TypesContext.Provider value={value}>
      {children}
    </TypesContext.Provider>
  );
}

export default TypesContainer;
