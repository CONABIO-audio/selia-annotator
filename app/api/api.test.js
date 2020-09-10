import fetchMock from 'jest-fetch-mock';
import APIClient from './index';
import { SAMPLE_ITEM_INFO } from './sampleInfo';

fetchMock.enableMocks();
beforeEach(() => {
    fetch.resetMocks();
});

const TEST_HOST = 'http://localhost:8000';
const TEST_PREFIX = '/api/v1/';
const TEST_CONFIG = { host: TEST_HOST, prefix: TEST_PREFIX };

test('Get existing item info', async () => {
    const api = new APIClient(TEST_CONFIG);
    const itemId = 36;

    fetch.mockResponseOnce(JSON.stringify(SAMPLE_ITEM_INFO));

    const itemInfo = await api.getItemInfo(itemId);
    expect(itemInfo).not.toBeUndefined();
    expect(itemInfo).not.toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
});

test.skip('Throw error at nonexistent item', () => {
    const api = new APIClient(TEST_CONFIG);
    const nonexistentItemId = 9999999;
    const fetchInfo = () => api.getItemInfo(nonexistentItemId);
    expect(fetchInfo).toThrow();
});

test.skip('Get existing annotation info', () => {
    const api = new APIClient(TEST_CONFIG);
    const annotationId = 36;
    const annotationInfo = api.getAnnotationInfo(annotationId);
    expect(annotationInfo).not.toBeUndefined();
    expect(annotationInfo).not.toBeNull();
});

test.skip('Throw error at nonexistent annotation', () => {
    const api = new APIClient(TEST_CONFIG);
    const nonexistentAnnotationId = 9999999;
    const fetchInfo = () => api.getAnnotationInfo(nonexistentAnnotationId);
    expect(fetchInfo).toThrow();
});
