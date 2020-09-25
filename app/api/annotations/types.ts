import { UserModel, Term } from '../types';

export interface AnnotationTool {
    id: number;
    annotation_type: number;
    name: string;
    version: string;
    logo: string;
    website: string;
}

export interface AnnotationType {
    id: number;
    name: string;
    description: string;
    icon: string;
    annotation_schema: object;
}

export interface Annotation extends UserModel {
    id: number;
    item: number;
    annotation_type: number;
    event_type: number;
    annotation: object;
    labels: Array<Term>;
    annotation_tool: number;
    visualizer: number;
    visualizer_configuration: object;
    certainty: null | 'H' | 'M' | 'L';
    quality: '' | 'H' | 'M' | 'L';
    commentaries?: string;
}
