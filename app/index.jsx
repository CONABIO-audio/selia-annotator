import React from 'react';
import Annotator from './ui/Annotator';


class AnnotatorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
    };
  }

  render() {
    const { ready } = this.state;
    return <Annotator ready={ready} />;
  }
}

export default AnnotatorContainer;
