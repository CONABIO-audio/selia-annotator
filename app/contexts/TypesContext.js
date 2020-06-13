import React from 'react';


const TypesContext = React.createContext({
  items: [],
  itemTypes: {},
  annotationTypes: {},
  eventTypes: {},
  annotators: {},
  visualizers: {},
});
TypesContext.displayName = 'TypesContext';


export default TypesContext;
