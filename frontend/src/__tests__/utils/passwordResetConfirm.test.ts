import type { PasswordResetConfirmFormData, PasswordResetConfirmFormErrors } from '@components/Password/ResetConfirm/types';
import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import { passwordResetConfirm } from '@utils/password';

describe('passwordResetConfirm util', () => {
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

        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toHaveBeenCalledWith(errors);
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

        expect(setFormErrorsMock).not.toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledWith('/login');
        expect(setAlertMock).toHaveBeenCalledOnce();
    });
});
