import APIManager from './index';

test('Get existing item info', () => {
  const api = new APIManager();
  const itemId = 36;
  const itemInfo = api.getItemInfo(itemId);
  expect(itemInfo).not.toBeUndefined();
  expect(itemInfo).not.toBeNull();
});

test('Throw error at nonexistent item', () => {
  const api = new APIManager();
  const nonexistentItemId = 9999999;
  const fetchInfo = () => api.getItemInfo(nonexistentItemId);
  expect(fetchInfo).toThrow();
});

test('Get existing annotation info', () => {
  const api = new APIManager();
  const annotationId = 36;
  const annotationInfo = api.getAnnotationInfo(annotationId);
  expect(annotationInfo).not.toBeUndefined();
  expect(annotationInfo).not.toBeNull();
});

test('Throw error at nonexistent annotation', () => {
  const api = new APIManager();
  const nonexistentAnnotationId = 9999999;
  const fetchInfo = () => api.getAnnotationInfo(nonexistentAnnotationId);
  expect(fetchInfo).toThrow();
});
