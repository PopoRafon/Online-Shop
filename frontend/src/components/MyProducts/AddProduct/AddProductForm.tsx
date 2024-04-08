import type { ChangeEvent, FormEvent } from 'react';
import type { NewProductFormData, NewProductFormErrors } from './types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '@utils/product';
import { isNewProductFormDataValid } from '@helpers/productValidators';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import UploadIcon from '@assets/images/icons/upload_icon.svg';

export default function AddProductForm() {
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();
    const [formData, setFormData] = useState<NewProductFormData>({ images: null, name: '', description: '', amount: '', price: '' });
    const [formErrors, setFormErrors] = useState<NewProductFormErrors>({ images: '', name: '', description: '', amount: '', price: '' });

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;

        if (files && files[0]) {
            const newImages: File[] = formData.images ? [...formData.images] : [];

            setFormData({
                ...formData,
                images: [...newImages, files[0]]
            });
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (isNewProductFormDataValid({ formData, setFormErrors })) {
            createProduct({ formData, navigate, setAlert, setFormErrors });
        }
    }

    return (
        <form
            className="add-product-form"
            onSubmit={handleSubmit}
            aria-label="Add product form"
        >
            <label className="add-product-form-label">
                Name
                <input
                    name="name"
                    type="text"
                    className={`add-product-form-input ${formErrors.name && 'add-product-form-input-error'}`}
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </label>
            <label className="add-product-form-label">
                Price
                <input
                    name="price"
                    type="number"
                    className={`add-product-form-input ${formErrors.price && 'add-product-form-input-error'}`}
                    value={formData.price}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </label>
            <label className="add-product-form-label">
                Amount
                <input
                    name="amount"
                    type="number"
                    className={`add-product-form-input ${formErrors.amount && 'add-product-form-input-error'}`}
                    value={formData.amount}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </label>
            <label className="add-product-form-label">
                Description
                <textarea
                    name="description"
                    className={`add-product-form-input ${formErrors.description && 'add-product-form-input-error'}`}
                    value={formData.description}
                    style={{ resize: 'none' }}
                    onChange={handleChange}
                    rows={8}
                    autoComplete="off"
                />
            </label>
            <label className="add-product-form-image-label">
                <img
                    src={UploadIcon}
                    width={40}
                    alt="Add image button"
                />
                Upload images
                <input
                    name="images"
                    type="file"
                    className="add-product-form-image-input"
                    onChange={handleImageChange}
                />
            </label>
            <input
                type="submit"
                value="Add product"
                className="add-product-form-submit"
            />
        </form>
    );
}
