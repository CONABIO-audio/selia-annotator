export interface AnnotationData {
    item: number;
    annotation_type: number;
    event_type: number;
    annotation: object;
    labels: Array<number>;
    annotation_tool: number;
    visualizer: number;
    visualizer_configuration: object;
    certainty: null | 'H' | 'M' | 'L';
    quality: null | 'H' | 'M' | 'L';
    commentaries: string;
}
