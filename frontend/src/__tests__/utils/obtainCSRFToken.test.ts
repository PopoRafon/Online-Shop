import { test, describe, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import obtainCSRFToken from '@utils/csrfToken';
import Cookies from 'js-cookie';

describe('obtainCSRFToken util', () => {
    const url: string = '/api/csrftoken';

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a GET request and does nothing', async () => {
        server.use(
            http.get(url, () => {
                return HttpResponse.json({
                    error: 'Error occurred when trying to create csrf token.'
                });
            })
        );
        await obtainCSRFToken();

        expect(Cookies.get('csrftoken')).toBeUndefined();
    });

    test('makes a GET request and adds received token to cookies', async () => {
        const csrfToken: string = 'csrftokenexample';
        server.use(
            http.get(url, () => {
                return HttpResponse.json({
                    success: csrfToken
                });
            })
        );
        await obtainCSRFToken();

        expect(Cookies.get('csrftoken')).not.toBeUndefined();
        expect(Cookies.get('csrftoken')).toBe(csrfToken);
    });
});
