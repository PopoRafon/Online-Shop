import type { ChangeEvent } from 'react';
import type { Product } from '@interfaces/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type CartEntryProps = {
    product: Product
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export default function CartEntry({ product, setTotalPrice }: CartEntryProps) {
    const [quantity, setQuantity] = useState<number>(1);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value, min, max } = event.target;
        const newValue: number = Math.max(Number(min), Math.min(Number(max), Number(value)));

        setTotalPrice(prev => prev + ((newValue - quantity) * product.price));
        setQuantity(newValue);
    }

    return (
        <div className="cart-entry">
            <img
                src={product.images[0]}
                className="cart-entry-image"
                alt="Product image"
            />
            <div className="cart-entry-product">
                <Link
                    className="cart-entry-product-name"
                    to={`/product/${product.id}`}
                >
                    {product.name}
                </Link>
            </div>
            <div className="cart-entry-side-information">
                <input
                    name="quantity"
                    type="number"
                    className="cart-entry-quantity-input"
                    value={quantity}
                    onChange={handleChange}
                    min={1}
                    max={product.amount}
                />
                <span className="cart-entry-price">
                    {product.price.toFixed(2)}$
                </span>
            </div>
        </div>
    );
}
