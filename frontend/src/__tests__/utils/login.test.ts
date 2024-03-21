import type { LoginFormData, LoginFormErrors } from '@components/Login/types';
import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import login from '@utils/login';

describe('login util', () => {
    const url: string = '/api/login';
    const server = setupServer();
    const formData: LoginFormData = {
        username: 'testusername',
        password: 'testpassword'
    };

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a POST request and calls setFormErrors with received errors', async () => {
        const setFormErrorsMock = vi.fn();
        const setAlertMock = vi.fn();
        const setUserMock = vi.fn();
        const navigateMock = vi.fn();
        const formErrors: LoginFormErrors = {
            username: 'Username is incorrect.',
            password: 'Password is incorrect.'
        };
        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    error: formErrors
                });
            })
        );

        await login({
            formData: formData,
            setFormErrors: setFormErrorsMock,
            setAlert: setAlertMock,
            setUser: setUserMock,
            navigate: navigateMock
        });

        expect(setAlertMock).not.toBeCalled();
        expect(setUserMock).not.toBeCalled();
        expect(navigateMock).not.toBeCalled();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toBeCalledWith(formErrors);
    });

    test('makes a POST request and calls setAlert, setUser, navigate functions', async () => {
        const setFormErrorsMock = vi.fn();
        const setAlertMock = vi.fn();
        const setUserMock = vi.fn();
        const navigateMock = vi.fn();
        const userData = { username: 'testusername' };
        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    success: 'You have been successfully logged in.'
                });
            }),
            http.get('/api/user', () => {
                return HttpResponse.json({
                    success: userData
                });
            })
        );

        await login({
            formData: formData,
            setFormErrors: setFormErrorsMock,
            setAlert: setAlertMock,
            setUser: setUserMock,
            navigate: navigateMock
        });

        expect(setAlertMock).toHaveBeenCalledOnce();
        expect(setAlertMock).toBeCalledWith({ show: true, text: 'You have been successfully logged in.' });
        expect(setUserMock).toHaveBeenCalledOnce();
        expect(setUserMock).toBeCalledWith({ isLoggedIn: true, ...userData });
        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toBeCalledWith('/');
        expect(setFormErrorsMock).not.toBeCalled();
    });
});
