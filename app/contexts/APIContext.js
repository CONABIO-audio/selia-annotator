import React from 'react';


const APIContext = React.createContext({
  item: null,
  itemInfo: {
    loading: true,
    error: null,
    data: null,
  },
  annotations: {
    loading: true,
    error: null,
    data: {},
  },
  createAnnotation: null,
  updateAnnotation: null,
  deleteAnnotation: null,
});
APIContext.displayName = 'APIContext';


export default APIContext;
