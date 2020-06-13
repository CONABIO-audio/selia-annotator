import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Annotator from './ui/Annotator';
import ItemSelector from './ui/ItemSelector';

import APIContainer from './containers/APIContainer';
import TypesContainer from './containers/TypesContainer';


function AnnotatorApp(props) {
  const {
    item,
    items,
    urls,
    itemTypes,
    annotationTypes,
    annotators,
    visualizers,
  } = props;
  const [currentItem, setCurrentItem] = useState(item);

  return (
    <TypesContainer
      items={items}
      itemTypes={itemTypes}
      annotationTypes={annotationTypes}
      annotators={annotators}
      visualizers={visualizers}
    >
      <APIContainer item={currentItem} urls={urls}>
        <Annotator
          itemSelector={
            <ItemSelector item={currentItem} items={items} setItem={setCurrentItem} />
          }
        />
      </APIContainer>
    </TypesContainer>
  );
}

AnnotatorApp.propTypes = {
  item: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  urls: PropTypes.exact({
    annotation_tools: PropTypes.string.isRequired,
    annotations: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    terms_autocomplete: PropTypes.string.isRequired,
    visualizers: PropTypes.string.isRequired,
  }).isRequired,
  itemTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    event_types: PropTypes.arrayOf(PropTypes.object).isRequired,
    created_on: PropTypes.string,
  })).isRequired,
  annotationTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    annotation_schema: PropTypes.object,
    created_on: PropTypes.string,
  })).isRequired,
  annotators: PropTypes.object.isRequired,
  visualizers: PropTypes.object.isRequired,
};


export default AnnotatorApp;
