import _ from 'lodash';
import { objects, actions, methods } from './constants';

const URL_MAPPING = {
  [objects.ITEMS]: {
    [actions.DETAIL]: [methods.GET, 'items/<pk>/'],
    [actions.SET_EVENT_READY]: [methods.PUT, 'items/<pk>/'],
  },
  [objects.ANNOTATIONS]: {
    [actions.CREATE]: [methods.POST, 'annotations/'],
    [actions.LIST]: [methods.GET, 'annotations/'],
    [actions.UPDATE]: [methods.PUT, 'annotations/<pk>/'],
    [actions.DETAIL]: [methods.GET, 'annotations/<pk>/'],
    [actions.DELETE]: [methods.DELETE, 'annotations/<pk>/'],
  },
  [objects.PREDICTIONS]: {
    [actions.LIST]: [methods.GET, 'predictions/'],
  },
};


class APIRoutes {
  constructor(config = {}) {
    this.config = config;
    this.host = _.get(config, 'host', '');
    this.prefix = _.get(config, 'prefix', '/api/v1/');

    this.urls = {
      ...URL_MAPPING,
      ..._.get(config, 'urls', {}),
    };
  }

  getUrl(object, action) {
    const baseUrl = this.urls[object][action][1];
    return this.host + this.prefix + baseUrl;
  }

  getMethod(object, action) {
    return this.urls[object][action][0];
  }
}

export default APIConfig;
