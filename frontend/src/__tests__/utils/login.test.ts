import type { LoginFormData, LoginFormErrors } from '@components/Login/types';
import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import login from '@utils/login';

describe('login util', () => {
    const url: string = '/api/login';
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

        expect(setAlertMock).not.toHaveBeenCalled();
        expect(setUserMock).not.toHaveBeenCalled();
        expect(navigateMock).not.toHaveBeenCalled();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toHaveBeenCalledWith(formErrors);
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
        expect(setUserMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledWith('/');
        expect(setFormErrorsMock).not.toHaveBeenCalled();
    });
});
