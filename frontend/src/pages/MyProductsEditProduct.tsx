import type { Product } from '@interfaces/types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '@utils/product';
import obtainCSRFToken from '@utils/csrfToken';
import GoBackButton from '@components/MyProducts/GoBackButton';
import ProductForm from '@components/MyProducts/ProductForm';
import useUserContext from '@contexts/UserContext/useUserContext';

export default function MyProductsEditProduct() {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const [images, setImages] = useState<File[]>([]);

    useEffect(() => {
        (async () => {
            obtainCSRFToken();

            await fetch(`/api/products/${id}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(async data => {
                    if (data.success) {
                        const newImages: File[] = [];

                        for (const imageUrl of data.success.images) {
                            const image = await fetch(imageUrl);
                            const blob = await image.blob();
                            const fileName = imageUrl.split('/').pop() as string;
                            const file = new File([blob], fileName, { type: blob.type });
                            newImages.push(file);
                        }
        
                        setImages(newImages);
                        setProduct(data.success);
                    } else {
                        navigate('/');
                    }
                });
        })();
    }, [id, navigate]);

    return product && (
        <main className="my-products-page">
            <section className="my-products-container">
                <GoBackButton />
                <ProductForm
                    images={images}
                    name={product.name}
                    description={product.description}
                    category={product.category}
                    amount={String(product.amount)}
                    price={String(Math.round(product.price * user.currency.multiplier * 100) / 100)}
                    submitText="Update product"
                    productFunc={(data) => updateProduct({ ...data, productId: product.id })}
                />
            </section>
        </main>
    );
}
