import type { Product } from '@interfaces/types';
import type { MouseEvent } from 'react';
import type { ActionsData } from './types';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';
import EditIcon from '@assets/images/icons/edit_icon.svg';

type MyProductsTableProps = {
    setActions: React.Dispatch<React.SetStateAction<ActionsData>>;
}

export default function MyProductsTable({ setActions }: MyProductsTableProps) {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const productsHeadersRef = useRef(['name', 'amount', 'price', 'sold'] as const);
    const tableRef = useRef<null | HTMLTableElement>(null);
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

    function showActions(productId: string) {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            const buttonRect = event.currentTarget.getBoundingClientRect();
            const tableRect = (tableRef.current as HTMLTableElement).getBoundingClientRect();
            const top: number = buttonRect.top - tableRect.top + buttonRect.height / 2;
            const left: number = buttonRect.left - tableRect.left;

            setActions({ show: true, productId, top, left });
        };
    }

    return (
        <table
            className="my-products-table"
            ref={tableRef}
        >
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
                        <td>{(product.price * user.currency.multiplier).toFixed(2)}{user.currency.symbol}</td>
                        <td>
                            {product.sold}
                            <button
                                onClick={showActions(product.id)}
                                className="my-products-table-offer-show-actions-button"
                            >
                                <img
                                    src={EditIcon}
                                    alt="Edit product"
                                />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
