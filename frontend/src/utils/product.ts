import type { NavigateFunction } from 'react-router-dom';
import type { NewProductFormData, NewProductFormErrors } from '@components/MyProducts/AddProduct/types';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import type { Product } from '@interfaces/types';
import Cookies from 'js-cookie';

type CreateProductArgs = {
    formData: NewProductFormData;
    navigate: NavigateFunction;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
    setFormErrors: React.Dispatch<React.SetStateAction<NewProductFormErrors>>;
}

async function createProduct({ formData, navigate, setAlert, setFormErrors }: CreateProductArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';
    const newFormData = new FormData();

    newFormData.append('name', formData.name);
    newFormData.append('description', formData.description);
    newFormData.append('amount', formData.amount);
    newFormData.append('category', formData.category);
    newFormData.append('price', String(Math.round(+formData.price * 100) / 100));

    for (const image of formData.images) {
        newFormData.append('uploaded_images', image);
    }

    return await fetch('/api/products', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
        },
        body: newFormData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                navigate('/my-products');
                setAlert({
                    show: true,
                    type: 'success',
                    text: 'Your product has been successfully added.'
                });
            } else if (data.error) {
                setFormErrors(data.error);
            }
        })
        .catch(() => {
            setAlert({
                show: true,
                type: 'error',
                text: 'Server could not be reached.'
            });
        });
}

type GetProductsArgs = {
    amount: number;
    name?: string;
    sort?: string;
    category?: string;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

async function getProducts({ amount, name='', sort='', category='', setProducts }: GetProductsArgs): Promise<void> {
    let url: string = `/api/products?limit=${amount}`;

    if (name) url += `&name=${name}`;

    if (sort) url += `&sort=${sort}`;

    if (category) url += `&category=${category}`;

    return await fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setProducts([
                    ...data.success.results,
                    ...new Array(amount - data.success.results.length).fill(null)
                ]);
            }
        });
}

export { createProduct, getProducts };
