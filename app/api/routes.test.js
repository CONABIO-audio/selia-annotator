import APIConfig from './config';
import { objects, actions, methods } from './constants';


test('Get correct default methods', () => {
  const config = new APIConfig();

  expect(config.getMethod(objects.ITEMS, actions.DETAIL)).toBe(methods.GET);
  expect(config.getMethod(objects.ITEMS, actions.SET_EVENT_READY)).toBe(methods.PUT);
  expect(config.getMethod(objects.ANNOTATIONS, actions.LIST)).toBe(methods.GET);
  expect(config.getMethod(objects.ANNOTATIONS, actions.CREATE)).toBe(methods.POST);
  expect(config.getMethod(objects.ANNOTATIONS, actions.UPDATE)).toBe(methods.PUT);
  expect(config.getMethod(objects.ANNOTATIONS, actions.DETAIL)).toBe(methods.GET);
  expect(config.getMethod(objects.ANNOTATIONS, actions.DELETE)).toBe(methods.DELETE);
  expect(config.getMethod(objects.PREDICTIONS, actions.LIST)).toBe(methods.GET);
});


test('Get correct default urls', () => {
  const config = new APIConfig({ prefix: '' });

  expect(config.getUrl(objects.ITEMS, actions.DETAIL)).toBe('items/<pk>/');
  expect(config.getUrl(objects.ITEMS, actions.SET_EVENT_READY)).toBe('items/<pk>/');
  expect(config.getUrl(objects.ANNOTATIONS, actions.LIST)).toBe('annotations/');
  expect(config.getUrl(objects.ANNOTATIONS, actions.CREATE)).toBe('annotations/');
  expect(config.getUrl(objects.ANNOTATIONS, actions.UPDATE)).toBe('annotations/<pk>/');
  expect(config.getUrl(objects.ANNOTATIONS, actions.DETAIL)).toBe('annotations/<pk>/');
  expect(config.getUrl(objects.ANNOTATIONS, actions.DELETE)).toBe('annotations/<pk>/');
  expect(config.getUrl(objects.PREDICTIONS, actions.LIST)).toBe('predictions/');
});
