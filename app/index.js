import React from 'react';
import ReactDOM from 'react-dom';
import Annotator from './Annotator';


export default function startApp(target, props) {
  ReactDOM.render(
    React.createElement(Annotator, props, null),
    document.getElementById(target),
  );
}
