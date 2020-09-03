import React, { useContext } from 'react';

import AnnotationsContext from '../contexts/AnnotationsContext';
import Sidebar from '../ui/Sidebar';


function SidebarContainer(props) {
  const { state, selectedAnnotation, hoverAnnotation } = useContext(AnnotationsContext);

  return <Sidebar state={state} selectedAnnotation={selectedAnnotation} hoverAnnotation={hoverAnnotation} />;
}


export default SidebarContainer;
