interface Model {
    created_on: string;
    modified_on: string;
}

export interface User {
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
}

interface UserModel extends Model {
    created_by: User;
    modified_by: User;
}

export interface LicenceType {
    id: number;
    name: string;
    can_view: boolean;
    can_download: boolean;
    can_annotate: boolean;
    years_valid_for: number;
}

export interface TermType {
    id: number;
    name: string;
    description: string;
    icon?: string;
    is_categorical: boolean;
}

export interface Term {
    id: number;
    value: string;
    term_type: number;
    term_type_name: string;
}

export interface EventType {
    id: number;
    name: string;
    description: string;
    icon: string;
    term_types: Array<TermType>;
    should_imply: Array<Term>;
}

export interface ItemType {
    id: number;
    name: string;
    icon?: string;
    event_types: Array<EventType>;
}

export interface Licence extends UserModel {
    id: number;
    is_active: boolean;
    licence_type: LicenceType;
}

export interface AnnotationType {
    id: number;
    name: string;
    description: string;
    icon: string;
    annotation_schema: object;
}

export interface CollectionType {
    id: number;
    name: string;
    description: string;
    restrict_annotation_types: boolean;
    restrict_event_types: boolean;
    annotation_types: Array<AnnotationType>;
    event_types: Array<EventType>;
}

export interface Collection {
    id: number;
    name: string;
    collection_type: CollectionType;
}

export interface AnnotationTool {
    id: number;
    name: string;
    version: string;
}

export interface Visualizer {
    id: number;
    name: string;
    version: string;
}

export interface Item extends UserModel {
    id: number;
    item_type: ItemType;
    licence: Licence;
    item_file: string;
    media_info: object;
    tags: Array<string>;
    metadata: object;
    captured_on: string;
    ready_event_types: Array<number>;
    collection: Collection;
}

export interface Annotation extends UserModel {
    id: number;
    item: number;
    annotation_type: number;
    event_type: number;
    annotation: object;
    labels: Array<Term>;
    annotation_tool: AnnotationTool;
    visualizer: Visualizer;
    visualizer_configuration: object;
    certainty: null | 'H' | 'M' | 'L';
    quality: '' | 'H' | 'M' | 'L';
}
