import type { Product } from '@interfaces/types';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';

export default function MyProductsBody() {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const productsHeadersRef = useRef(['Offer', 'Amount', 'Price', 'Sold'] as const);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`/api/products?username=${user.username}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.success);
                }
            });
    }, [user.username]);

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
                    {products.map(product => (
                        <tr
                            onClick={() => navigate(`/product/${product.id}`)}
                            style={{ cursor: 'pointer' }}
                            key={product.id}
                        >
                            <td>{product.name}</td>
                            <td>{product.amount}</td>
                            <td>{product.price}$</td>
                            <td>{product.sold}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
