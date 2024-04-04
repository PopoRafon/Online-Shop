import type { Product } from '@components/MyProducts/Home/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MyProductsBody from '@components/MyProducts/Home/MyProductsBody';

export default function MyProducts() {
    const [products] = useState<Product[]>([]);

    return (
        <main className="my-products-page">
            <section className="my-products-container">
                <div className="my-products-header">
                    <h3 className="my-products-header-text">My products</h3>
                    <Link
                        to='/my-products/add/product'
                        className="my-products-header-add-button"
                    >
                        ADD NEW
                    </Link>
                </div>
                <MyProductsBody
                    products={products}
                />
            </section>
        </main>
    );
}
