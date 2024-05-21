import type { PasswordResetFormData, PasswordResetFormErrors } from '@components/Password/Reset/types';
import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import { passwordReset } from '@utils/password';

describe('passwordReset util', () => {
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

        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toHaveBeenCalledWith(errors);
        expect(navigateMock).not.toHaveBeenCalled();
        expect(setAlertMock).not.toHaveBeenCalled();
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

        expect(setFormErrorsMock).not.toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledWith('/');
        expect(setAlertMock).toHaveBeenCalledOnce();
    });
});
