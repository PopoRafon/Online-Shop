import { useEffect } from 'react';
import obtainCSRFToken from '@utils/csrfToken';
import ProductForm from '@components/MyProducts/ProductForm';
import GoBackButton from '@components/MyProducts/GoBackButton';

export default function MyProductsAddProduct() {
    useEffect(() => {
        obtainCSRFToken();
    }, []);

    return (
        <main className="my-products-page">
            <section className="my-products-container">
                <GoBackButton />
                <ProductForm />
            </section>
        </main>
    );
}
