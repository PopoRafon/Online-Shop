import type { ProductFormData, ProductFormErrors } from '@components/MyProducts/types';
import { describe, test, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import { createProduct } from '@utils/product';

describe('createProduct util', () => {
    const url: string = '/api/products';
    const formData: ProductFormData = {
        name: 'test name',
        description: 'test description',
        amount: '5',
        price: '10.5',
        category: '',
        images: ['test_image' as unknown as File]
    };

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes POST request and calls setFormErrors function', async () => {
        const setFormErrorsMock = vi.fn();
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        const errors: ProductFormErrors = {
            name: 'Name is too short.',
            description: 'Description is too short.',
            amount: 'Amount is too small.',
            price: 'Price is too small.',
            images: 'Image is in incorrect format.',
            category: 'Category cannot be null.'
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
            setFormErrors: setFormErrorsMock,
            currency: { multiplier: 1, symbol: '' }
        });

        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toHaveBeenCalledWith(errors);
        expect(navigateMock).not.toHaveBeenCalled();
        expect(setAlertMock).not.toHaveBeenCalled();
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
            setFormErrors: setFormErrorsMock,
            currency: { multiplier: 1, symbol: '' }
        });

        expect(setFormErrorsMock).not.toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledWith('/my-products');
        expect(setAlertMock).toHaveBeenCalledOnce();
    });
});
