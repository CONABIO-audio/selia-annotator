import { Objects, Actions, HttpMethods } from './constants';

type MethodURLTuple = [HttpMethods, string];
type ActionURLMapping = { [K in Actions]?: MethodURLTuple };
type URLMapping = { [O in Objects]?: ActionURLMapping };

const DEFAULT_URL_MAPPING: URLMapping = {
    [Objects.Items]: {
        [Actions.Detail]: [HttpMethods.GET, 'items/<pk>/'],
        [Actions.SetEventReady]: [HttpMethods.PUT, 'items/<pk>/'],
    },
    [Objects.Annotations]: {
        [Actions.Create]: [HttpMethods.POST, 'annotations/'],
        [Actions.List]: [HttpMethods.GET, 'annotations/'],
        [Actions.Update]: [HttpMethods.PUT, 'annotations/<pk>/'],
        [Actions.Detail]: [HttpMethods.GET, 'annotations/<pk>/'],
        [Actions.Delete]: [HttpMethods.DELETE, 'annotations/<pk>/'],
    },
    [Objects.Predictions]: {
        [Actions.List]: [HttpMethods.GET, 'predictions/'],
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

    getMethod(object: Objects, action: Actions): HttpMethods {
        return this.urls[object][action][0];
    }
}

export default APIRoutesConfiguration;
