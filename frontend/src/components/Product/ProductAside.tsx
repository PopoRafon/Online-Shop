import type { Product } from '@interfaces/types';
import { useState, useRef } from 'react';
import PlusIcon from '@assets/images/icons/plus_icon.svg';
import MinusIcon from '@assets/images/icons/minus_icon.svg';

type ProductAsideProps = {
    product: Product;
}

export default function ProductAside({ product }: ProductAsideProps) {
    const quantityInputRef = useRef<HTMLInputElement | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    function handleChange() {
        const { value, min, max } = quantityInputRef.current as HTMLInputElement;
        const newValue: number = Math.max(Number(min), Math.min(Number(max), Number(value)));

        setQuantity(newValue);
    }

    function addToQuantity(val: number) {
        return () => {
            const { value, min, max } = quantityInputRef.current as HTMLInputElement;
            const newValue: number = Math.max(Number(min), Math.min(Number(max), Number(value) + val));

            setQuantity(newValue);
        };
    }

    return (
        <aside className="product-aside-container">
            <div className="product-aside-information-container">
                <span className="product-aside-information-cost">{product.price}$</span>
                <span>{product.sold} sold</span>
            </div>
            <div className="product-aside-quantity-container">
                <button
                    className="product-aside-quantity-button"
                    onClick={addToQuantity(-1)}
                >
                    <img
                        src={MinusIcon}
                        alt="Decrement image"
                    />
                </button>
                <input
                    type="number"
                    className="product-aside-quantity-input"
                    value={quantity}
                    onChange={handleChange}
                    min={1}
                    max={product.amount}
                    ref={quantityInputRef}
                />
                <button
                    className="product-aside-quantity-button"
                    onClick={addToQuantity(1)}
                >
                    <img
                        src={PlusIcon}
                        alt="Increment image"
                    />
                </button>
                <span className="product-aside-quantity-information">
                    from {product.amount} units
                </span>
            </div>
            <button
                className="product-aside-buy-button"
            >
                Add to cart
            </button>
            <button
                className="product-aside-buy-button"
            >
                Buy and pay
            </button>
        </aside>
    );
}
