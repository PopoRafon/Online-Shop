import { describe, test, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import logout from '@utils/logout';

describe('logout util', () => {
    const url: string = '/api/logout';
    const server = setupServer();

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

        expect(setUserMock).not.toBeCalled();
        expect(setAlertMock).not.toBeCalled();
        expect(navigateMock).not.toBeCalled();
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
        expect(setAlertMock).toBeCalledWith({ show: true, type: 'success', text: 'You have been successfully logged out.' });
        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toBeCalledWith('/');
    });
});
