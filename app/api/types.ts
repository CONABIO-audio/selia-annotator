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

export interface UserModel extends Model {
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

export interface Licence extends UserModel {
    id: number;
    is_active: boolean;
    licence_type: LicenceType;
}
