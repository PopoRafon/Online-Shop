import type { ChangeEvent, FormEvent } from 'react';
import type { NewProductFormData, NewProductFormErrors } from './types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '@utils/product';
import { isNewProductFormDataValid } from '@helpers/productValidators';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import AddProductInput from './AddProductInput';
import UploadIcon from '@assets/images/icons/upload_icon.svg';
import CloseIcon from '@assets/images/icons/close_icon.svg';

export default function AddProductForm() {
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();
    const [formData, setFormData] = useState<NewProductFormData>({ images: [], name: '', description: '', amount: '', price: '' });
    const [formErrors, setFormErrors] = useState<NewProductFormErrors>({ images: '', name: '', description: '', amount: '', price: '' });
    const [imagesUrls, setImagesUrls] = useState<string[]>([]);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleImageAddition(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;

        if (files && files[0]) {
            setFormData({
                ...formData,
                images: [...formData.images, files[0]]
            });
            setImagesUrls([
                ...imagesUrls,
                URL.createObjectURL(files[0])
            ]);
        }
    }

    function handleImageRemoval(index: number) {
        /* eslint-disable @typescript-eslint/naming-convention */
        const newImagesUrls = imagesUrls.filter((_, idx) => idx !== index);
        const newFormDataImages = formData.images.filter((_, idx) => idx !== index);
        /* eslint-enable */

        setImagesUrls(newImagesUrls);
        setFormData({
            ...formData,
            images: newFormDataImages
        });
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
            noValidate
        >
            <AddProductInput
                name="name"
                label="Name"
                error={formErrors.name}
                value={formData.name}
                handleChange={handleChange}
            />
            <AddProductInput
                name="price"
                label="Price"
                error={formErrors.price}
                value={formData.price}
                handleChange={handleChange}
                type='number'
            />
            <AddProductInput
                name="amount"
                label="Amount"
                error={formErrors.amount}
                value={formData.amount}
                handleChange={handleChange}
                type='number'
            />
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
                <span className="add-product-form-error-message">{formErrors.description}</span>
            </label>
            <div className={`add-product-form-images-container ${formErrors.images && 'add-product-form-image-error'}`}>
                <div className="add-product-form-images-container-body">
                    {imagesUrls.map((image, index) => (
                        <div className="add-product-form-image" key={index}>
                            <img
                                src={image}
                                width={60}
                                height={60}
                                alt="Product image"
                            />
                            <button
                                type="button"
                                onClick={() => handleImageRemoval(index)}
                                className="add-product-form-image-remove-button"
                                title="Remove image"
                            >
                                <img
                                    src={CloseIcon}
                                    width={15}
                                    height={15}
                                    alt="Remove image button"
                                />
                            </button>
                        </div>
                    ))}
                </div>
                <span className="add-product-form-error-message">{formErrors.images}</span>
            </div>
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
                    onChange={handleImageAddition}
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
