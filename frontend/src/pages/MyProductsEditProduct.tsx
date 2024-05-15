import type { Product } from '@interfaces/types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import obtainCSRFToken from '@utils/csrfToken';
import GoBackButton from '@components/MyProducts/GoBackButton';

export default function MyProductsEditProduct() {
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
        <main className="my-products-page">
            <section className="my-products-container">
                <GoBackButton />
            </section>
        </main>
    );
}
