import APIRoutes from './routes';
import { Objects, Actions, HTTPMethods } from './constants';

test('Get correct default HTTPMethods', () => {
    const routes = new APIRoutes();

    expect(routes.getMethod(Objects.Items, Actions.Detail)).toBe(HTTPMethods.GET);
    expect(routes.getMethod(Objects.Items, Actions.SetEventReady)).toBe(HTTPMethods.PUT);
    expect(routes.getMethod(Objects.Annotations, Actions.List)).toBe(HTTPMethods.GET);
    expect(routes.getMethod(Objects.Annotations, Actions.Create)).toBe(HTTPMethods.POST);
    expect(routes.getMethod(Objects.Annotations, Actions.Update)).toBe(HTTPMethods.PUT);
    expect(routes.getMethod(Objects.Annotations, Actions.Detail)).toBe(HTTPMethods.GET);
    expect(routes.getMethod(Objects.Annotations, Actions.Delete)).toBe(HTTPMethods.DELETE);
    expect(routes.getMethod(Objects.Predictions, Actions.List)).toBe(HTTPMethods.GET);
});

test('Get correct default urls', () => {
    const routes = new APIRoutes({ prefix: '' });

    expect(routes.getUrl(Objects.Items, Actions.Detail)).toBe('items/<pk>/');
    expect(routes.getUrl(Objects.Items, Actions.SetEventReady)).toBe('items/<pk>/');
    expect(routes.getUrl(Objects.Annotations, Actions.List)).toBe('annotations/');
    expect(routes.getUrl(Objects.Annotations, Actions.Create)).toBe('annotations/');
    expect(routes.getUrl(Objects.Annotations, Actions.Update)).toBe('annotations/<pk>/');
    expect(routes.getUrl(Objects.Annotations, Actions.Detail)).toBe('annotations/<pk>/');
    expect(routes.getUrl(Objects.Annotations, Actions.Delete)).toBe('annotations/<pk>/');
    expect(routes.getUrl(Objects.Predictions, Actions.List)).toBe('predictions/');
});
