import APIRoutes from './routes';
import { Objects, Actions, HttpMethods } from './constants';

test('Get correct default HttpMethods', () => {
    const routes = new APIRoutes();

    expect(routes.getMethod(Objects.Items, Actions.Detail)).toBe(HttpMethods.GET);
    expect(routes.getMethod(Objects.Items, Actions.SetEventReady)).toBe(HttpMethods.PUT);
    expect(routes.getMethod(Objects.Annotations, Actions.List)).toBe(HttpMethods.GET);
    expect(routes.getMethod(Objects.Annotations, Actions.Create)).toBe(HttpMethods.POST);
    expect(routes.getMethod(Objects.Annotations, Actions.Update)).toBe(HttpMethods.PUT);
    expect(routes.getMethod(Objects.Annotations, Actions.Detail)).toBe(HttpMethods.GET);
    expect(routes.getMethod(Objects.Annotations, Actions.Delete)).toBe(HttpMethods.DELETE);
    expect(routes.getMethod(Objects.Predictions, Actions.List)).toBe(HttpMethods.GET);
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
