import type { RegisterFormData, RegisterFormErrors } from '@components/Register/types';
import { test, describe, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import register from '@utils/register';

describe('register util', () => {
    const url: string = '/api/register';
    const formData: RegisterFormData = {
        email: 'testemail@gmail.com',
        username: 'testusername',
        password1: 'testpassword',
        password2: 'testpassword',
        rules: true
    };

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a POST request and calls setFormErrors function', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        const setUserMock = vi.fn();
        const errors: RegisterFormErrors = {
            email: 'Email address is not unique.',
            username: 'Username is not unique.',
            password1: 'Password needs to be more complex.',
            password2: 'Passwords do not match.',
            rules: 'Rules must be accepted.'
        };
        server.use(
            http.post(url, async () => {
                return HttpResponse.json({
                    error: errors
                });
            })
        );

        await register({
            formData: formData,
            setFormErrors: setFormErrorsMock,
            navigate: navigateMock,
            setAlert: setAlertMock,
            setUser: setUserMock
        });

        expect(setUserMock).not.toHaveBeenCalled();
        expect(navigateMock).not.toHaveBeenCalled();
        expect(setAlertMock).not.toHaveBeenCalled();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toHaveBeenCalledWith(errors);
    });

    test('makes a POST request and calls navigate function and setAlert function', async () => {
        const userData = { username: 'testusername' };
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        const setUserMock = vi.fn();
        server.use(
            http.post(url, async () => {
                return HttpResponse.json({
                    success: 'Your account has been successfully created.'
                });
            }),
            http.get('/api/user', async () => {
                return HttpResponse.json({
                    success: userData
                });
            })
        );

        await register({
            formData: formData,
            setFormErrors: setFormErrorsMock,
            navigate: navigateMock,
            setAlert: setAlertMock,
            setUser: setUserMock
        });

        expect(setUserMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledWith('/');
        expect(setAlertMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).not.toHaveBeenCalled();
    });
});
