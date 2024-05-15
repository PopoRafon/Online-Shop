import type { ProductFormData } from './types';
import CloseIcon from '@assets/images/icons/close_icon.svg';

type ProductImagesProps = {
    imagesUrls: string[];
    error: string;
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
    setImagesUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductImages({ imagesUrls, error, formData, setFormData, setImagesUrls }: ProductImagesProps) {
    function handleImageRemoval(index: number) {
        return () => {
            URL.revokeObjectURL(imagesUrls[index]);
            /* eslint-disable @typescript-eslint/naming-convention */
            const newImagesUrls = imagesUrls.filter((_, idx) => idx !== index);
            const newFormDataImages = formData.images.filter((_, idx) => idx !== index);
            /* eslint-enable */

            setImagesUrls(newImagesUrls);
            setFormData({
                ...formData,
                images: newFormDataImages
            });
        };
    }

    return (
        <div className={`my-products-form-images-container ${error && 'my-products-form-image-error'}`}>
            <div className="my-products-form-images-container-body">
                {imagesUrls.map((image, index) => (
                    <div className="my-products-form-image" key={index}>
                        <img
                            src={image}
                            width={60}
                            height={60}
                            alt="Product image"
                        />
                        <button
                            type="button"
                            onClick={handleImageRemoval(index)}
                            className="my-products-form-image-remove-button"
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
            <span className="my-products-form-error-message">{error}</span>
        </div>
    );
}
