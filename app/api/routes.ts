import { Objects, Actions, HTTPMethods } from './constants';

type MethodURLTuple = [HTTPMethods, string];
type ActionURLMapping = { [K in Actions]?: MethodURLTuple };
type URLMapping = { [O in Objects]?: ActionURLMapping };

const DEFAULT_URL_MAPPING: URLMapping = {
    [Objects.Items]: {
        [Actions.Detail]: [HTTPMethods.GET, 'items/<pk>/'],
        [Actions.SetEventReady]: [HTTPMethods.PUT, 'items/<pk>/'],
    },
    [Objects.Annotations]: {
        [Actions.Create]: [HTTPMethods.POST, 'annotations/'],
        [Actions.List]: [HTTPMethods.GET, 'annotations/'],
        [Actions.Update]: [HTTPMethods.PUT, 'annotations/<pk>/'],
        [Actions.Detail]: [HTTPMethods.GET, 'annotations/<pk>/'],
        [Actions.Delete]: [HTTPMethods.DELETE, 'annotations/<pk>/'],
    },
    [Objects.Predictions]: {
        [Actions.List]: [HTTPMethods.GET, 'predictions/'],
    },
    [Objects.AnnotationTools]: {
        [Actions.List]: [HTTPMethods.GET, 'annotation_tools/'],
    },
};

export interface APIConfig {
    host?: string;
    prefix?: string;
    urls?: URLMapping;
}

class APIRoutesConfiguration {
    host: string;

    prefix: string;

    urls: URLMapping;

    constructor(
        { host = '', prefix = '/annotator/api/', urls = {} }: APIConfig = {
            host: '',
            prefix: '/annotator/api/',
            urls: {},
        },
    ) {
        this.host = host;
        this.prefix = prefix;
        this.urls = {
            ...DEFAULT_URL_MAPPING,
            ...urls,
        };
    }

    getUrl(object: Objects, action: Actions): string {
        const baseUrl = this.urls[object][action][1];
        return this.host + this.prefix + baseUrl;
    }

    getMethod(object: Objects, action: Actions): HTTPMethods {
        return this.urls[object][action][0];
    }
}

export default APIRoutesConfiguration;
