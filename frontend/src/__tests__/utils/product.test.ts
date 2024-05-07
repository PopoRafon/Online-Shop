import type { NewProductFormData, NewProductFormErrors } from '@components/MyProducts/AddProduct/types';
import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { createProduct, getProducts } from '@utils/product';

describe('createProduct util', () => {
    const url: string = '/api/products';
    const server = setupServer();
    const formData: NewProductFormData = {
        name: 'test name',
        description: 'test description',
        amount: '5',
        price: '10.5',
        images: ['test_image' as unknown as File]
    };

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes POST request and calls setFormErrors function', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        const errors: NewProductFormErrors = {
            name: 'Name is too short.',
            description: 'Description is too short.',
            amount: 'Amount is too small.',
            price: 'Price is too small.',
            images: 'Image is in incorrect format.'
        };

        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    error: errors
                });
            })
        );

        await createProduct({
            formData: formData,
            navigate: navigateMock,
            setAlert: setAlertMock,
            setFormErrors: setFormErrorsMock
        });

        expect(setFormErrorsMock).toBeCalledTimes(1);
        expect(setFormErrorsMock).toBeCalledWith(errors);
        expect(navigateMock).not.toBeCalled();
        expect(setAlertMock).not.toBeCalled();
    });

    test('makes POST request and calls setAlert function and navigates user to my-products page', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();

        server.use(
            http.post(url, () => {
                return HttpResponse.json({
                    success: 'Your product has been successfully added.'
                });
            })
        );

        await createProduct({
            formData: formData,
            navigate: navigateMock,
            setAlert: setAlertMock,
            setFormErrors: setFormErrorsMock
        });

        expect(setFormErrorsMock).not.toBeCalled();
        expect(navigateMock).toBeCalledTimes(1);
        expect(navigateMock).toBeCalledWith('/my-products');
        expect(setAlertMock).toBeCalledTimes(1);
        expect(setAlertMock).toBeCalledWith({ show: true, type: 'success', text: 'Your product has been successfully added.' });
    });
});

describe('getProducts util', () => {
    const url: string = `/api/products`;
    const server = setupServer();

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
