import type { Product } from './types';
import { useRef, useEffect, useState } from 'react';

export default function MyProductsBody() {
    const productsHeadersRef = useRef(['Offer', 'Amount', 'Price', 'Sold'] as const);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.success);
                }
            });
    }, []);

    return (
        <div className="my-products-body">
            <table className="my-products-body-table">
                <colgroup>
                    <col style={{ width: '40%' }} />
                    <col span={3} style={{ width: '20%' }} />
                </colgroup>
                <thead>
                    <tr>
                        {productsHeadersRef.current.map(product => (
                            <th key={product}>
                                <button
                                    className="my-products-body-table-head-button"
                                >
                                    {product}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((offer, index) => (
                        <tr key={index}>
                            <td style={{ padding: '4px 83px' }}>
                                <img
                                    src={offer.images[0].image}
                                    className="my-products-body-table-offer-image"
                                    alt="Offer image"
                                />
                                {offer.name}
                            </td>
                            <td>{offer.amount}</td>
                            <td>{offer.price}$</td>
                            <td>{offer.sold}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
