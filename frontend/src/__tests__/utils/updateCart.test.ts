import type { PathParams, DefaultBodyType } from 'msw';
import { describe, test, beforeAll, afterAll, afterEach, beforeEach, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import { updateCart } from '@utils/cart';

describe('updateCart util', () => {
    const productId: string = 'test-product-id';
    const url: string = '/api/cart';

    beforeAll(() => server.listen());
    beforeEach(() => {
        server.use(
            http.patch<PathParams, DefaultBodyType, Record<string, string>>(url, async ({ request }) => {
                const data = await request.json() as Record<string, string>;

                if (data.product_id !== productId) {
                    return HttpResponse.json({
                        error: 'Error occurred while trying to add product to your cart.'
                    }, { status: 400 });
                }

                return HttpResponse.json({
                    success: 'Product has been successfully added to your cart.'
                }, { status: 200 });
            })
        );
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a PATCH request and does nothing', async () => {
        const setAlertMock = vi.fn();

        await updateCart({
            productId: 'wrong-product-id',
            setAlert: setAlertMock
        });

        expect(setAlertMock).not.toHaveBeenCalled();
    });

    test('makes a PATCH request and calls setAlert function', async () => {
        const setAlertMock = vi.fn();

        await updateCart({
            productId: productId,
            setAlert: setAlertMock
        });

        expect(setAlertMock).toHaveBeenCalledOnce();
    });
});
