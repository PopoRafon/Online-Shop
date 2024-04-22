import type { Product } from '@interfaces/types';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';

export default function MyProductsTable() {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const productsHeadersRef = useRef(['name', 'amount', 'price', 'sold'] as const);
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

    function handleSort(column: keyof Product) {
        return () => {
            const sortedData: Product[] = [...products].sort((a, b) => {
                if (a[column] < b[column]) return 1;
                if (a[column] > b[column]) return -1;
                return 0;
            });

            setProducts(sortedData);
        };
    }

    return (
        <table className="my-products-table">
            <colgroup>
                <col style={{ width: '40%' }} />
                <col span={3} style={{ width: '20%' }} />
            </colgroup>
            <thead>
                <tr className="primary-border">
                    {productsHeadersRef.current.map(column => (
                        <th key={column}>
                            <button
                                className="my-products-table-head-button"
                                onClick={handleSort(column)}
                            >
                                {column}
                            </button>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr
                        className="primary-border"
                        onClick={() => navigate(`/product/${product.id}`)}
                        style={{ cursor: 'pointer' }}
                        key={product.id}
                    >
                        <td className="my-products-table-offer-cell">
                            <img
                                src={product.images[0]}
                                className="my-products-table-offer-image"
                                alt="Product image"
                            />
                            {product.name}
                        </td>
                        <td>{product.amount}</td>
                        <td>{product.price.toFixed(2)}$</td>
                        <td>{product.sold}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
