import type { NavigateFunction } from 'react-router-dom';
import type { NewProductFormData, NewProductFormErrors } from '@components/MyProducts/AddProduct/types';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
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
    newFormData.append('price', String(Math.round(+formData.price * 100) / 100));

    for (const image of formData.images) {
        newFormData.append('uploaded_images', image);
    }

    return await fetch('/api/products', {
        method: 'POST',
        headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'X-CSRFToken': csrfToken
        },
        body: newFormData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                navigate('/my-products');
                setAlert({ show: true, text: 'Your product has been successfully added.' });
            } else if (data.error) {
                setFormErrors(data.error);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export { createProduct };
