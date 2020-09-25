import { UserModel, Licence, EventType } from '../types';
import { Collection } from '../collectionTypes/types';

export interface ItemType {
    id: number;
    name: string;
    icon?: string;
    event_types: Array<EventType>;
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
