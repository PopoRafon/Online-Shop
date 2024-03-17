import type { RegisterFormData, RegisterFormErrors } from '@components/register/types';
import { test, describe, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import register from '@utils/register';

describe('register util', () => {
    const url: string = '/api/register';
    const server = setupServer();
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
            setAlert: setAlertMock
        });
        
        expect(navigateMock).not.toBeCalled();
        expect(setAlertMock).not.toBeCalled();
        expect(setFormErrorsMock).toBeCalledTimes(1);
        expect(setFormErrorsMock).toBeCalledWith(errors);
    });

    test('makes a POST request and calls navigate function and setAlert function', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        server.use(
            http.post(url, async () => {
                return HttpResponse.json({
                    success: 'Your account has been successfully created.'
                });
            })
        );

        await register({
            formData: formData,
            setFormErrors: setFormErrorsMock,
            navigate: navigateMock,
            setAlert: setAlertMock
        });
        
        expect(navigateMock).toBeCalledTimes(1);
        expect(navigateMock).toBeCalledWith('/');
        expect(setAlertMock).toBeCalledTimes(1);
        expect(setAlertMock).toBeCalledWith({ show: true, text: 'Your account has been successfully created.' });
        expect(setFormErrorsMock).not.toBeCalled();
    });
});
