import type { PathParams, DefaultBodyType } from 'msw';
import type { ProductFormData, ProductFormErrors } from '@components/MyProducts/types';
import type { CurrencyType } from '@helpers/currency';
import { describe, test, beforeAll, afterAll, afterEach, beforeEach, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/node';
import { updateProduct } from '@utils/product';

describe('updateProduct util', () => {
    const productId: string = 'test-product-id';
    const url: string = `/api/products/${productId}`;
    const currency: CurrencyType = {
        symbol: '$',
        multiplier: 1
    };
    const formData: ProductFormData = {
        name: 'new product name',
        description: '',
        amount: '10',
        category: 'electronics',
        price: '20.5',
        images: []
    };
    const formErrors: ProductFormErrors = {
        name: 'Cannot be null.',
        description: '',
        amount: 'Cannot be lesser than 1.',
        category: 'Cannot be null.',
        price: 'Cannot be lesser than 0.',
        images: 'Cannobt be null.'
    };

    beforeAll(() => server.listen());
    beforeEach(() => {
        server.use(
            http.patch<PathParams, DefaultBodyType, Record<string, string | object>>(url, async ({ request }) => {
                const data = await request.formData();

                if (!Object.keys(formData).every(key => key === 'images' ? true : formData[key as keyof ProductFormData] === data.get(key))) {
                    return HttpResponse.json({
                        error: formErrors
                    }, { status: 400 });
                }

                return HttpResponse.json({
                    success: 'Product has been successfully created.'
                }, { status: 200 });
            })
        );
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('makes a POST request and calls setAlert function and redirects user to my-products page', async () => {
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        const setFormErrorsMock = vi.fn();

        await updateProduct({
            formData: formData,
            currency: currency,
            productId: productId,
            navigate: navigateMock,
            setAlert: setAlertMock,
            setFormErrors: setFormErrorsMock
        });

        expect(navigateMock).toHaveBeenCalledOnce();
        expect(navigateMock).toHaveBeenCalledWith('/my-products');
        expect(setAlertMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).not.toHaveBeenCalled();
    });

    test('makes a POST request and calls setFormErrors function with received errors', async () => {
        const navigateMock = vi.fn();
        const setAlertMock = vi.fn();
        const setFormErrorsMock = vi.fn();

        await updateProduct({
            // @ts-expect-error We pass object only with images since we want to receive error message
            formData: { images: [] },
            currency: currency,
            productId: productId,
            navigate: navigateMock,
            setAlert: setAlertMock,
            setFormErrors: setFormErrorsMock
        });

        expect(navigateMock).not.toHaveBeenCalled();
        expect(setAlertMock).not.toHaveBeenCalled();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toHaveBeenCalledWith(formErrors);
    });
});
