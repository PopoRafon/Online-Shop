import { test, describe, expect, beforeEach, afterAll, afterEach, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import AccessToken from '@utils/accessToken';

describe('accessToken util', () => {
    const url: string = '/api/token/refresh';
    const server = setupServer();

    beforeEach(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('refreshToken method makes POST request and does nothing', async () => {
        const spy = vi.spyOn(AccessToken, 'setPeriodicTokenRefresh');
        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    error: 'Error occurred while trying to create access token.'
                });
            })
        );
        await AccessToken.refreshToken();

        expect(spy).not.toBeCalled();
    });

    test('refreshToken method makes POST request and calls setPeriodicTokenRefresh method', async () => {
        const spy = vi.spyOn(AccessToken, 'setPeriodicTokenRefresh');
        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    success: 'Your access token has been successfully created.'
                });
            })
        );
        await AccessToken.refreshToken();

        expect(spy).toHaveBeenCalledOnce();
    });
});
