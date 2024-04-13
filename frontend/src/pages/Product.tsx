import type { Product } from '@interfaces/types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductContainer from '@components/Product/ProductContainer';
import ProductAside from '@components/Product/ProductAside';

export default function Product() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>({ id: '', images: [], name: '', description: '', amount: 0, price: 0, sold: 0 });

    useEffect(() => {
        fetch(`/api/products/${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProduct(data.success);
                    setIsLoaded(true);
                } else {
                    navigate('/');
                }
            });
    }, [id, navigate]);

    return isLoaded && (
        <main className="product-page">
            <ProductContainer
                product={product}
            />
            <ProductAside
                product={product}
            />
        </main>
    );
}
