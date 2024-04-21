import type { PasswordResetFormData, PasswordResetFormErrors } from '@components/Password/Reset/types';
import type { PasswordResetConfirmFormData, PasswordResetConfirmFormErrors } from '@components/Password/ResetConfirm/types';
import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { passwordReset, passwordResetConfirm } from '@utils/password';

describe('passwordReset util', () => {
    const server = setupServer();
    const url: string = '/api/password/reset';
    const formData: PasswordResetFormData = {
        email: 'testemail@example.com'
    };

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes POST request and calls setFormErrors function', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        const errors: PasswordResetFormErrors = {
            email: 'User with provided email was not found.'
        };

        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    error: errors
                });
            })
        );

        await passwordReset({
            setFormErrors: setFormErrorsMock,
            navigate: navigateMock,
            setAlert: setAlertMock,
            formData: formData
        });

        expect(setFormErrorsMock).toBeCalledTimes(1);
        expect(setFormErrorsMock).toBeCalledWith(errors);
        expect(navigateMock).not.toBeCalled();
        expect(setAlertMock).not.toBeCalled();
    });

    test('makes POST request and calls setAlert function and navigates to homepage', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();

        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    success: 'Password reset message has been sent to your email.'
                });
            })
        );

        await passwordReset({
            setFormErrors: setFormErrorsMock,
            navigate: navigateMock,
            setAlert: setAlertMock,
            formData: formData
        });

        expect(setFormErrorsMock).not.toBeCalled();
        expect(navigateMock).toBeCalledTimes(1);
        expect(navigateMock).toBeCalledWith('/');
        expect(setAlertMock).toBeCalledTimes(1);
        expect(setAlertMock).toBeCalledWith({ show: true, type: 'success', text: 'Password reset message has been sent to your email.' });
    });
});

describe('passwordResetConfirm util', () => {
    const server = setupServer();
    const url: string = '/api/password/reset/confirm/testuidb64/testtoken';
    const formData: PasswordResetConfirmFormData = {
        newPassword1: 'newTestPassword',
        newPassword2: 'newTestPassword'
    };

    beforeAll(() => {
        // @ts-expect-error Location will be missing unnecessary properties
        global.window = { location: { pathname: 'password/reset/confirm/testuidb64/testtoken' } };
        server.listen();
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes POST request and calls setFormErrors function', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        const errors: PasswordResetConfirmFormErrors = {
            newPassword1: 'Password is too short.',
            newPassword2: 'Passwords do not match.'
        };

        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    error: errors
                });
            })
        );

        await passwordResetConfirm({
            setFormErrors: setFormErrorsMock,
            navigate: navigateMock,
            setAlert: setAlertMock,
            formData: formData
        });

        expect(setFormErrorsMock).toBeCalledTimes(1);
        expect(setFormErrorsMock).toBeCalledWith(errors);
        expect(navigateMock).not.toBeCalled();
        expect(setAlertMock).not.toBeCalled();
    });

    test('makes POST request and calls setAlert function and navigates to login page', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();

        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    success: 'Your password has been successfully changed.'
                });
            })
        );

        await passwordResetConfirm({
            setFormErrors: setFormErrorsMock,
            navigate: navigateMock,
            setAlert: setAlertMock,
            formData: formData
        });

        expect(setFormErrorsMock).not.toBeCalled();
        expect(navigateMock).toBeCalledTimes(1);
        expect(navigateMock).toBeCalledWith('/login');
        expect(setAlertMock).toBeCalledTimes(1);
        expect(setAlertMock).toBeCalledWith({
            show: true,
            type: 'success',
            text: 'Your password has been successfully changed. Now you can login to your account.'
        });
    });
});
