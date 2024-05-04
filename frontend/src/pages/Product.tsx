import type { Product } from '@interfaces/types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import obtainCSRFToken from '@utils/csrfToken';
import ProductContainer from '@components/Product/ProductContainer';
import ProductAside from '@components/Product/ProductAside';

export default function Product() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        obtainCSRFToken();

        fetch(`/api/products/${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProduct(data.success);
                } else {
                    navigate('/');
                }
            });
    }, [id, navigate]);

    return product && (
        <main className="product-page">
            <div className="product">
                <ProductContainer
                    product={product}
                />
                <article className="primary-border product-description-container">
                    <h3 className="product-description-header">Description</h3>
                    {product.description}
                </article>
            </div>
            <ProductAside
                product={product}
            />
        </main>
    );
}
