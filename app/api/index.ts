import _ from 'lodash';
import $ from 'jquery';
import fetch from 'unfetch';

import APIRoutes, { APIConfig } from './routes';
import { Objects, Actions, HTTPMethods } from './constants';
import { Item } from './items/types';
import { Annotation, AnnotationTool } from './annotations/types';
import { AnnotationData } from './creationTypes';

const PK_SUB = '<pk>';

interface APIResponse<T> {
    data: T | null;
    error: string | null;
}

class APIClient {
    routes: APIRoutes;

    constructor(config: APIConfig = {}) {
        this.routes = new APIRoutes(config);
    }

    _urlencode(query: any): string {
        return $.param(query);
    }

    async fetch(
        object: Objects,
        action: Actions,
        pk: number = null,
        query: any = {},
        data: any = {},
    ): Promise<APIResponse<any>> {
        if (!_.isPlainObject(query)) {
            throw TypeError('Query in API fetch is not a plain object.');
        }

        if (!_.isPlainObject(data)) {
            throw TypeError('Data in API fetch is not a plain object.');
        }

        let body = '';
        try {
            body = JSON.stringify(data);
        } catch (e) {
            throw TypeError('Data in API fetch is not serializable');
        }

        let url: string = this.routes.getUrl(object, action);

        if (!_.isNull(pk) && url.includes(PK_SUB)) {
            url = url.replace(PK_SUB, pk.toString(10));
        }

        const method = this.routes.getMethod(object, action);
        const options: { [propName: string]: any } = { method };
        if (body !== '' && method !== HTTPMethods.GET) {
            options['body'] = body;
        }

        return fetch(url, options)
            .then((response) => response.json())
            .then((data) => ({
                data,
                error: null,
            }))
            .catch((error) => ({
                data: null,
                error,
            }));
    }

    /** Load all relevant information of a given item */
    async getItemInfo(itemId: number): Promise<APIResponse<Item>> {
        return this.fetch(Objects.Items, Actions.Detail, itemId);
    }

    /** Load all annotations of an item . */
    async getAnnotations(itemId: number): Promise<APIResponse<Array<Annotation>>> {
        return this.fetch(Objects.Annotations, Actions.List, null, { item: itemId });
    }

    /** Load annotation tools for a type of annotation */
    async getAnnotationTools(annotationType: number): Promise<APIResponse<Array<AnnotationTool>>> {
        return this.fetch(Objects.AnnotationTools, Actions.List, null, { annotation_type: annotationType });
    }

    /** Register a new annotation to the database */
    createAnnotation(itemId: number, annotationData: AnnotationData): Promise<any> {
        return this.fetch(Objects.Annotations, Actions.Create, itemId, annotationData);
    }

    /** Delete an annotation */
    deleteAnnotation(annotationId: number) {}

    /** Update annotation info */
    updateAnnotation(annotationId: number, annotationData: any) {}

    /** Check event type for item as ready */
    setItemIsReady(itemId: number, eventId: number) {}

    /** Uncheck event type for item as ready */
    unsetItemIsReady(itemId: number, eventId: number) {}

    /** Get a list of machine generated annotations */
    getPredictions(itemId: number, query: any = {}) {}
}

export default APIClient;
