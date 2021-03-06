import React from 'react';
import AnnotationToolBar from '../components/AnnotationToolBar';


class VisualizerControler extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        active: false,
        selectedAnnotationType: null,
      };
    }

    render() {
      return (
        <div className="col">
          <div className="row">
            <AnnotationToolBar
              info={this.props.info.annotationTypes}
              active={this.state.active}
              selected={this.state.selectedAnnotationType}
              select={(typeInfo) => this.selectAnnotationType(typeInfo)}
            />
          </div>
          {this.renderVisualizerToolbar()}
          <div className="row">
            {this.renderCanvas()}
          </div>
        </div>
      );
    }

    selectAnnotationType(typeInfo){
      if (this.visualizer) {
        this.visualizer.deactivate();
      }

      this.setState({
        selectedAnnotationType: typeInfo.annotation_type,
        active: true,
      }, () => {
        this.props.setAnnotationInfo({
          'annotationType': typeInfo.annotation_type,
          'annotationTool': this.props.components.annotators[typeInfo.annotation_type].annotation_tool
        })
        this.loadAnnotator()
      });
    }

    renderVisualizerToolbar() {
      if (this.visualizer) {
        return (
          <div className="row">
          {this.visualizer.renderToolbar()}
          </div>
        );
      }
    }

    loadVisualizer() {
      let itemInfo = {
        url: this.props.info.item.url + 'download',
      };

      this.visualizer = new this.props.components.visualizer({
        canvas: this.visualizerCanvas,
        itemInfo: itemInfo,
        active: !this.state.active,
        activator: () => this.activateVisualizer()
      });

      this.props.setAnnotationInfo({visualizer: this.props.components.visualizer_id})
      this.forceUpdate();
    }

    activateVisualizer() {
      this.visualizer.activate();
      this.setState({active: false});
    }

    loadAnnotator() {
      let selected = this.state.selectedAnnotationType;

      if (selected && selected in this.props.components.annotators) {
        if (this.annotator) {
          this.annotator.unmount();
        }

        let annotationComponent = this.props.components.annotators[selected].annotator
        this.annotator = new annotationComponent({
          canvas: this.annotatorCanvas,
          visualizer: this.visualizer,
          edit: true,
          registerAnnotation: (annotation) => this.registerAnnotation(annotation),
        });
      }
    }

    registerAnnotation(annotation) {
      this.props.setAnnotationInfo({
        annotation: annotation,
        visualizerConfiguration: this.visualizer.getConfig()
      });
    }

    componentDidMount() {
      this.loadVisualizer();
    }

    componentWillUnmount() {
      if (this.visualizer) {
        this.visualizer.unmount();
        this.visualizer = null;
      }

      if (this.annotator) {
        this.annotator.unmount();
        this.annotator = null;
      }
    }

    renderCanvas() {
      return (
        <div className="col">
          <div className="row" style={{
            height: "30em",
            width: "100%",
            textAlign: 'center'}}
          >
            <canvas
              id="visualizerCanvas"
              ref={(node) => {this.visualizerCanvas = node;}}
              style={{
                display: 'block',
                position: 'absolute',
              }}
            >
            </canvas>
            <canvas
              ref={(node) => {this.annotatorCanvas = node;}}
              id="annotatorCanvas"
              style={{
                display: 'block',
                position: 'absolute',
                zIndex: 99,
                pointerEvents: this.state.active ? 'auto' : 'none',
              }}
            >
            </canvas>
          </div>
        </div>
      );
    }
}


export default VisualizerControler;
