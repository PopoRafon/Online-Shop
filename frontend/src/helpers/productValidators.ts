import type { NewProductFormData, NewProductFormErrors } from '@components/MyProducts/AddProduct/types';

type IsProductFormValidArgs = {
    formData: NewProductFormData;
    setFormErrors: React.Dispatch<React.SetStateAction<NewProductFormErrors>>;
}

function isNewProductFormDataValid({ formData, setFormErrors }: IsProductFormValidArgs): boolean {
    const newFormErrors: NewProductFormErrors = { images: '', name: '', description: '', price: '', amount: '' };
    const priceAsNumber: number = +formData.price;
    const amountAsNumber: number = +formData.amount;

    if (formData.name.length < 4) newFormErrors.name = 'Name cannot be shorter than 4 characters.';
    else if (formData.name.length > 64) newFormErrors.name = 'Name cannot be longer than 64 characters.';

    if (formData.description.length > 1024) newFormErrors.description = 'Description cannot be longer than 1024 characters.';

    if (formData.images && !(formData.images instanceof File)) newFormErrors.images = 'Images must be a valid file.';

    if (isNaN(priceAsNumber)) newFormErrors.price = 'Price must be a valid number.';
    else if (priceAsNumber > 1e6) newFormErrors.price = 'Price cannot be larger than 1,000,000.';
    else if (priceAsNumber < 0.01) newFormErrors.price = 'Price cannot be smaller than 0.01.';

    if (isNaN(amountAsNumber)) newFormErrors.amount = 'Amount must be a valid number.';
    else if (amountAsNumber > 1e6) newFormErrors.amount = 'Amount cannot be larger than 1,000,000';
    else if (amountAsNumber < 1) newFormErrors.amount = 'Amount cannot be smaller than 1.';

    setFormErrors({ ...newFormErrors });

    return !Object.values(newFormErrors).some(field => field);
}

export { isNewProductFormDataValid };
