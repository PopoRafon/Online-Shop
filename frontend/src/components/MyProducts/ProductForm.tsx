import type { ChangeEvent, FormEvent } from 'react';
import type { ProductFormData, ProductFormErrors } from './types';
import type { NavigateFunction } from 'react-router-dom';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import type { CurrencyType } from '@helpers/currency';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isProductFormDataValid } from '@helpers/productValidators';
import useUserContext from '@contexts/UserContext/useUserContext';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import ProductInput from './ProductInput';
import ProductCategory from './ProductCategory';
import ProductDescription from './ProductDescription';
import ProductImages from './ProductImages';
import ProductUpload from './ProductUpload';

type ProductFuncArgs = {
    formData: ProductFormData;
    currency: CurrencyType;
    navigate: NavigateFunction;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
    setFormErrors: React.Dispatch<React.SetStateAction<ProductFormErrors>>;
}

type ProductFormProps = {
    images: File[];
    name: string;
    description: string;
    category: string;
    amount: string;
    price: string;
    submitText: string;
    productFunc(args: ProductFuncArgs): void;
}

export default function ProductForm({ images, name, description, category, amount, price, submitText, productFunc }: ProductFormProps) {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();
    const [formData, setFormData] = useState<ProductFormData>({ images, name, description, category, amount, price });
    const [formErrors, setFormErrors] = useState<ProductFormErrors>({ images: '', name: '', description: '', category: '', amount: '', price: '' });
    const [imagesUrls, setImagesUrls] = useState<string[]>(images.map(image => URL.createObjectURL(image)));

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (isProductFormDataValid({ formData, setFormErrors })) {
            productFunc({ formData, currency: user.currency, navigate, setAlert, setFormErrors });
        }
    }

    return (
        <form
            className="primary-border my-products-form"
            onSubmit={handleSubmit}
            aria-label="Add product form"
            noValidate
        >
            <ProductInput
                name="name"
                label="Name"
                error={formErrors.name}
                value={formData.name}
                handleChange={handleChange}
            />
            <ProductInput
                name="price"
                label="Price"
                error={formErrors.price}
                value={formData.price}
                handleChange={handleChange}
                type="number"
            />
            <ProductInput
                name="amount"
                label="Amount"
                error={formErrors.amount}
                value={formData.amount}
                handleChange={handleChange}
                type="number"
            />
            <ProductDescription
                value={formData.description}
                error={formErrors.description}
                handleChange={handleChange}
            />
            <ProductImages
                imagesUrls={imagesUrls}
                error={formErrors.images}
                formData={formData}
                setFormData={setFormData}
                setImagesUrls={setImagesUrls}
            />
            <ProductUpload
                setFormData={setFormData}
                setImagesUrls={setImagesUrls}
            />
            <ProductCategory
                value={formData.category}
                error={formErrors.category}
                handleChange={handleChange}
            />
            <input
                type="submit"
                value={submitText}
                className="primary-button my-products-form-submit"
            />
        </form>
    );
}
