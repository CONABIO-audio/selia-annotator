import React from 'react';
import APIContext from '../contexts/APIContext';
import { useAPIRequest } from './utils';


function useAnnotations(item, urls) {
  const annotationsUrl = urls.annotations.replace('item_pk', item);
  const annotations = useAPIRequest(annotationsUrl);

  function parseAnnotations(data) {
    if (data === null) return null;

    const parsedData = {};
    data.results.forEach((annotation) => {
      parsedData[annotation.id] = annotation;
    });

    return parsedData;
  }

  return {
    ...annotations,
    data: parseAnnotations(annotations.data),
  };
}


function APIContainer(props) {
  const { item, urls, children } = props;
  const itemUrl = urls.item.replace('item_pk', item);
  const itemInfo = useAPIRequest(itemUrl);
  const annotations = useAnnotations(item, urls);
  return (
    <APIContext.Provider value={{ item, itemInfo, annotations }}>
      {children}
    </APIContext.Provider>
  );
}


export default APIContainer;
