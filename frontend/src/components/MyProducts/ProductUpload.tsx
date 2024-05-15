import type { ChangeEvent } from 'react';
import type { ProductFormData } from './types';
import UploadIcon from '@assets/images/icons/upload_icon.svg';

type ProductUploadProps = {
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
    setImagesUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductUpload({ setFormData, setImagesUrls }: ProductUploadProps) {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;

        if (files && files[0] && !(files[0].size >= 25e5)) {
            setFormData(formData => ({
                ...formData,
                images: [...formData.images, files[0]]
            }));
            setImagesUrls(urls => [
                ...urls,
                URL.createObjectURL(files[0])
            ]);
        }
    }

    return (
        <label
            className="my-products-form-image-label"
            title="Files cannot be larger than 2,5MB"
        >
            <img
                src={UploadIcon}
                width={40}
                alt="Add image button"
            />
            Upload images
            <input
                name="images"
                type="file"
                className="my-products-form-image-input"
                onChange={handleChange}
            />
        </label>
    );
}
