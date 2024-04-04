import type { ChangeEvent, FormEvent } from 'react';
import type { NewProductFormData } from './types';
import { useState } from 'react';
import UploadIcon from '@assets/images/icons/upload_icon.svg';

export default function AddProductForm() {
    const [formData, setFormData] = useState<NewProductFormData>({ images: [], name: '', description: '', amount: 0, price: 0 });

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <form
            className="add-product-form"
            onSubmit={handleSubmit}
        >
            <label className="add-product-form-label">
                Name
                <input
                    name="name"
                    type="text"
                    className="add-product-form-input"
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
                    className="add-product-form-input"
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
                    className="add-product-form-input"
                    value={formData.amount}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </label>
            <label className="add-product-form-label">
                Description
                <textarea
                    name="description"
                    className="add-product-form-input"
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
