import { describe, test, expect, vi, afterAll, afterEach, beforeAll } from 'vitest';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { getReviews, createReview } from '@utils/reviews';

describe('getReviews util', () => {
    const productId: string = 'testid';
    const url: string = `/api/products/${productId}/reviews`;
    const server = setupServer();

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

describe('createReview util', () => {
    const productId: string = 'testid';
    const url: string = `/api/products/${productId}/reviews`;
    const server = setupServer();

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a POST request and calls setTextError with received errors', async () => {
        const text: string = '';
        const setTextMock = vi.fn();
        const setAlertMock = vi.fn();
        const setReviewsMock = vi.fn();
        const setTextErrorMock = vi.fn();
        const errors = { text: 'Ensure this field is not shorter than 4 characters.' };

        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    error: errors
                });
            })
        );

        await createReview({
            text: text,
            setText: setTextMock,
            productId: productId,
            setAlert: setAlertMock,
            setReviews: setReviewsMock,
            setTextError: setTextErrorMock
        });

        expect(setTextMock).not.toHaveBeenCalled();
        expect(setAlertMock).not.toHaveBeenCalled();
        expect(setReviewsMock).not.toHaveBeenCalled();
        expect(setTextErrorMock).toHaveBeenCalledOnce();
        expect(setTextErrorMock).toHaveBeenCalledWith(errors.text);
    });

    test('makes a POST request and calls setText, setAlert and setReviews functions', async () => {
        const text: string = 'testtext';
        const setTextMock = vi.fn();
        const setAlertMock = vi.fn();
        const setReviewsMock = vi.fn();
        const setTextErrorMock = vi.fn();
        const data: string = 'testdata';

        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    success: data
                });
            })
        );

        await createReview({
            text: text,
            setText: setTextMock,
            productId: productId,
            setAlert: setAlertMock,
            setReviews: setReviewsMock,
            setTextError: setTextErrorMock
        });

        expect(setTextMock).toHaveBeenCalledOnce();
        expect(setTextMock).toHaveBeenCalledWith('');
        expect(setAlertMock).toHaveBeenCalledOnce();
        expect(setAlertMock).toHaveBeenCalledWith({ show: true, type: 'success', text: 'Your review has been successfully created.' });
        expect(setReviewsMock).toHaveBeenCalledOnce();
        expect(setTextErrorMock).not.toHaveBeenCalled();
    });
});
