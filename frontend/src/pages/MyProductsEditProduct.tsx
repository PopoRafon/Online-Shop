import type { Product } from '@interfaces/types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import obtainCSRFToken from '@utils/csrfToken';
import EditProductModal from '@components/MyProducts/EditProduct/EditProductModal';

export default function MyProductsEditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showModal, setShowModal] = useState<boolean>(false);
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
            {showModal && (
                <EditProductModal
                    id={product.id}
                    setShowModal={setShowModal}
                />
            )}
            <section className="my-products-container">
                <button
                    onClick={() => setShowModal(true)}
                    className="edit-product-delete-button"
                >
                    Delete
                </button>
            </section>
        </main>
    );
}
