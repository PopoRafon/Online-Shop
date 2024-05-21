import type { PathParams, DefaultBodyType } from 'msw';
import type { Product } from '@interfaces/types';
import { describe, test, expect, vi, beforeAll, beforeEach, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import { createRating } from '@utils/rating';

describe('createRating util', () => {
    const rating: number = 4;
    const product: Product = {
        id: 'test-product-id',
        username: 'user',
        name: 'test product',
        description: '',
        images: [],
        price: 12,
        amount: 15,
        sold: 0,
        category: 'electronics',
        reviews: 0,
        ratings: []
    };
    const url: string = `/api/products/${product.id}/ratings`;

    beforeAll(() => server.listen());
    beforeEach(() => {
        server.use(
            http.post<PathParams, DefaultBodyType, Record<string, string>>(url, async ({ request }) => {
                const data = await request.json() as Record<string, string | number>;

                if (data.rating !== rating || data.product !== product.id) {
                    return HttpResponse.json({
                        error: 'Error occurred while trying to add your rating.'
                    }, { status: 400 });
                }

                return HttpResponse.json({
                    success: 'Your rating has been successfully created.'
                }, { status: 200 });
            })
        );
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a POST request and calls setProduct, setStars and setAlert functions', async () => {
        const setAlertMock = vi.fn();
        const setProductMock = vi.fn();
        const setStarsMock = vi.fn();

        await createRating({
            productId: product.id,
            rating: rating,
            setAlert: setAlertMock,
            product: product,
            setProduct: setProductMock,
            setStars: setStarsMock
        });

        expect(setAlertMock).toHaveBeenCalledOnce();
        expect(setProductMock).toHaveBeenCalledOnce();
        expect(setStarsMock).toHaveBeenCalledOnce();
    });

    test('makes a POST request and does nothing', async () => {
        const setAlertMock = vi.fn();
        const setProductMock = vi.fn();
        const setStarsMock = vi.fn();

        await createRating({
            productId: product.id,
            rating: 6,
            setAlert: setAlertMock,
            product: product,
            setProduct: setProductMock,
            setStars: setStarsMock
        });

        expect(setAlertMock).not.toHaveBeenCalled();
        expect(setProductMock).not.toHaveBeenCalled();
        expect(setStarsMock).not.toHaveBeenCalled();
    });
});
