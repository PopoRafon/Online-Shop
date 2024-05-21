import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import { getProducts } from '@utils/product';

describe('getProducts util', () => {
    const url: string = `/api/products`;

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes GET request and does nothing', async () => {
        const setProductsMock = vi.fn();

        server.use(
            http.get(url, () => {
                return HttpResponse.json({
                    error: 'Error occurred while trying to retrieve products.'
                });
            })
        );

        await getProducts({
            amount: 3,
            setProducts: setProductsMock
        });

        expect(setProductsMock).not.toHaveBeenCalled();
    });

    test('makes GET request and calls setProducts function with received data', async () => {
        const setProductsMock = vi.fn();
        const data: string[] = ['some', 'test', 'data'];

        server.use(
            http.get(url, () => {
                return HttpResponse.json({
                    success: {
                        results: data
                    }
                });
            })
        );

        await getProducts({
            amount: 3,
            setProducts: setProductsMock
        });

        expect(setProductsMock).toHaveBeenCalledOnce();
        expect(setProductsMock).toHaveBeenCalledWith(data);
    });
});
