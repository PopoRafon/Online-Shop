import type { NavigateFunction } from 'react-router-dom';
import type { NewProductFormData } from '@components/MyProducts/AddProduct/types';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import Cookies from 'js-cookie';

type CreateProductArgs = {
    formData: NewProductFormData;
    navigate: NavigateFunction;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
}

async function createProduct({ formData, navigate, setAlert }: CreateProductArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';
    const newFormData = new FormData();

    for (const key in formData) {
        newFormData.append(key, formData[key as keyof NewProductFormData] as string | Blob);
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
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export { createProduct };
