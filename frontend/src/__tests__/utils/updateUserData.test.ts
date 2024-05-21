import type { PathParams, DefaultBodyType } from 'msw';
import type { SettingsFormData, SettingsFormErrors } from '@components/Settings/types';
import { describe, test, expect, vi, beforeAll, beforeEach, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import { updateUserData } from '@utils/userData';

describe('updateUserData util', () => {
    const url: string = '/api/user';
    /* eslint-disable @typescript-eslint/naming-convention */
    const formErrors: SettingsFormErrors = {
        email: 'Cannot be null.',
        username: 'Cannot be shorter than 8 characters.',
        first_name: '',
        last_name: ''
    };
    const formData: SettingsFormData = {
        email: 'email@example.com',
        username: 'username',
        first_name: 'first name',
        last_name: 'last name'
    };
    /* eslint-enable @typescript-eslint/naming-convention */

    beforeAll(() => server.listen());
    beforeEach(() => {
        server.use(
            http.patch<PathParams, DefaultBodyType, Record<string, object>>(url, async ({ request }) => {
                const data = await request.json();

                if (JSON.stringify(data) !== JSON.stringify(formData)) {
                    return HttpResponse.json({
                        error: formErrors
                    }, { status: 400 });
                }

                return HttpResponse.json({
                    success: formData
                }, { status: 200 });
            })
        );
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a PATCH request and calls setUser and setAlert functions', async () => {
        const setUserMock = vi.fn();
        const setAlertMock = vi.fn();
        const setFormErrorsMock = vi.fn();

        await updateUserData({
            formData: formData,
            setFormErrors: setFormErrorsMock,
            setAlert: setAlertMock,
            setUser: setUserMock
        });

        expect(setUserMock).toHaveBeenCalledOnce();
        expect(setAlertMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).not.toHaveBeenCalled();
    });

    test('makes a PATCH request and calls setFormErrors function with received errors', async () => {
        const setUserMock = vi.fn();
        const setAlertMock = vi.fn();
        const setFormErrorsMock = vi.fn();

        await updateUserData({
            // @ts-expect-error We pass empty object since we want to receive error message
            formData: {},
            setFormErrors: setFormErrorsMock,
            setAlert: setAlertMock,
            setUser: setUserMock
        });

        expect(setUserMock).not.toHaveBeenCalled();
        expect(setAlertMock).not.toHaveBeenCalled();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toHaveBeenCalledWith(formErrors);
    });
});
