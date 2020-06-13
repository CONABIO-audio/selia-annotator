import React from 'react';
import ReactDOM from 'react-dom';
import AnnotatorApp from './AnnotatorApp';


export default function startApp(target, props) {
  ReactDOM.render(
    React.createElement(AnnotatorApp, props, null),
    document.getElementById(target),
  );
}
