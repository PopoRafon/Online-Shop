import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getUserData } from '@utils/userData';

describe('getUserData util', () => {
    const url: string = '/api/user';
    const server = setupServer();

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a GET request and does nothing', async () => {
        const setUserMock = vi.fn();
        server.use(
            http.get(url, () => {
                return HttpResponse.json({
                    error: 'Error occurred while trying to retrieve your user data.'
                });
            })
        );

        await getUserData({ setUser: setUserMock });

        expect(setUserMock).not.toBeCalled();
    });

    test('makes a GET request and calls setUser function with received user data', async () => {
        const setUserMock = vi.fn();
        const userData = { username: 'testusername' };
        server.use(
            http.get(url, () => {
                return HttpResponse.json({
                    success: userData
                });
            })
        );

        await getUserData({ setUser: setUserMock });

        expect(setUserMock).toHaveBeenCalledOnce();
    });
});
