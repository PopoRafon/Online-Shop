import { describe, test, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import logout from '@utils/logout';

describe('logout util', () => {
    const url: string = '/api/logout';

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a POST request and does nothing', async () => {
        const setUserMock = vi.fn();
        const setAlertMock = vi.fn();
        const navigateMock = vi.fn();
        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    error: 'Error occurred while trying to log you out.'
                });
            })
        );

        await logout({
            setUser: setUserMock,
            setAlert: setAlertMock,
            navigate: navigateMock
        });

        expect(setUserMock).not.toHaveBeenCalled();
        expect(setAlertMock).not.toHaveBeenCalled();
        expect(navigateMock).not.toHaveBeenCalled();
    });

    test('makes a POST request and calls setUser, setAlert functions and navigates user to home page', async () => {
        const setUserMock = vi.fn();
        const setAlertMock = vi.fn();
        const navigateMock = vi.fn();
        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    success: 'You have been successfully logged out.'
                });
            })
        );

        await logout({
            setUser: setUserMock,
            setAlert: setAlertMock,
            navigate: navigateMock
        });

        expect(setUserMock).toHaveBeenCalledOnce();
        expect(setAlertMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledWith('/');
    });
});
