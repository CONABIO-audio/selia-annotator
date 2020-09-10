import React from 'react';
import ReactDOM from 'react-dom';
import Annotator from './Annotator';

export default function startApp(target: string, props: any): void {
    const element = React.createElement(Annotator, props, null);
    const DOMTarget = document.getElementById(target);
    ReactDOM.render(element, DOMTarget);
}
