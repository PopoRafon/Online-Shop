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

    if (!formData.images) newFormErrors.images = 'Images must contain at least one file.';
    else if (formData.images.length > 8) newFormErrors.images = 'Images cannot contain more than 8 files.';
    else {
        for (const image of formData.images) {
            if (!(image instanceof File)) newFormErrors.images = 'Images must contain valid files.';
            else if (image.size > 2.5e6) newFormErrors.images = 'Images files cannot be bigger than 2.5MB.';
            else if (!image.type.match(/^image\/(jpg|png|jpeg)$/)) newFormErrors.images = 'Images files must be formatted as ".jpg", ".jpeg" or ".png".';
        }
    }

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
