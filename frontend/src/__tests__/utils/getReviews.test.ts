import { describe, test, expect, vi, afterAll, afterEach, beforeAll } from 'vitest';
import { HttpResponse, http } from 'msw';
import { server } from '@tests/node';
import { getReviews } from '@utils/reviews';

describe('getReviews util', () => {
    const productId: string = 'testid';
    const url: string = `/api/products/${productId}/reviews`;

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a GET request and navigates user to homepage', async () => {
        const navigateMock = vi.fn();
        const setReviewsMock = vi.fn();

        server.use(
            http.get(url, () => {
                return HttpResponse.json({
                    error: 'Error occurred while trying to retrieve reviews.'
                });
            })
        );

        await getReviews({
            productId: productId,
            navigate: navigateMock,
            setReviews: setReviewsMock
        });

        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledWith('/');
        expect(setReviewsMock).not.toHaveBeenCalled();
    });

    test('makes a GET request and calls setReviews function with received data', async () => {
        const navigateMock = vi.fn();
        const setReviewsMock = vi.fn();
        const data: string[] = ['test', 'data'];

        server.use(
            http.get(url, () => {
                return HttpResponse.json({
                    success: data
                });
            })
        );

        await getReviews({
            productId: productId,
            navigate: navigateMock,
            setReviews: setReviewsMock
        });

        expect(navigateMock).not.toHaveBeenCalled();
        expect(setReviewsMock).toHaveBeenCalledOnce();
        expect(setReviewsMock).toHaveBeenCalledWith(data);
    });
});
