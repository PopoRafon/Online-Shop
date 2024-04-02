import type { Product } from '@components/MyProducts/types';
import { useState } from 'react';
import MyProductsBody from '@components/MyProducts/MyProductsBody';
import MyProductsHeader from '@components/MyProducts/MyProductsHeader';

export default function MyProducts() {
    const [products] = useState<Product[]>([]);

    return (
        <main className="my-products-page">
            <section className="my-products-container">
                <MyProductsHeader />
                <MyProductsBody
                    products={products}
                />
            </section>
        </main>
    );
}
