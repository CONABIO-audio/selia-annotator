import { EventType } from '../types';
import { AnnotationType } from '../annotations/types';

interface Visualizer {
    id: number;
    name: string;
    version: string;
    website: string;
    configuration_schema: object;
}

interface VisualizerComponent {
    id: number;
    visualizer: Visualizer;
    javascript_file: string;
}

interface VisualizerComponentItemType {
    id: number;
    is_active: boolean;
    visualizer_component: VisualizerComponent;
    item_type: number;
}

interface AnnotationTool {
    id: number;
    annotation_type: AnnotationType;
    name: string;
    version: string;
    logo: string;
    website: string;
}

interface AnnotationToolComponent {
    id: number;
    is_active: boolean;
    annotation_tool: AnnotationTool;
    javascript_file: string;
}

export interface CollectionType {
    id: number;
    name: string;
    description: string;
    restrict_annotation_types: boolean;
    restrict_event_types: boolean;
    annotation_tools: Array<AnnotationToolComponent>;
    event_types: Array<EventType>;
}

export interface Collection {
    id: number;
    name: string;
    collection_type: number;
}
