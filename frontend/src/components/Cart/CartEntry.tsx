import type { ChangeEvent } from 'react';
import type { Product } from '@interfaces/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TrashIcon from '@assets/images/icons/trash_icon.svg';

type CartEntryProps = {
    product: Product
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
    handleProductRemoval: (productId: string, price: number) => void;
}

export default function CartEntry({ product, setTotalPrice, handleProductRemoval }: CartEntryProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(false);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value, min, max } = event.target;
        const newValue: number = Math.max(Number(min), Math.min(Number(max), Number(value)));

        setTotalPrice(prev => prev + ((newValue - quantity) * product.price));
        setQuantity(newValue);
    }

    return (
        <div className="primary-border cart-entry">
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
                    className="primary-border cart-entry-quantity-input"
                    value={quantity}
                    onChange={handleChange}
                    min={1}
                    max={product.amount}
                />
                <div className="cart-entry-side-remove-product-container">
                    <button
                        className="cart-entry-side-remove-product-button"
                        onClick={() => setShowModal(prev => !prev)}
                    >
                        <img
                            src={TrashIcon}
                            width={18}
                            height={19}
                            alt="Remove product button image"
                        />
                    </button>
                    {showModal && (
                        <div className="primary-border cart-entry-modal">
                            <span className="cart-entry-modal-text">Remove this product from your cart?</span>
                            <div className="cart-entry-modal-buttons-container">
                                <button
                                    className="primary-button cart-entry-button"
                                    onClick={() => handleProductRemoval(product.id, quantity * product.price)}
                                >
                                    Yes
                                </button>
                                <button
                                    className="primary-button cart-entry-button"
                                    onClick={() => setShowModal(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <span className="cart-entry-price">
                    {(product.price * quantity).toFixed(2)}$
                </span>
            </div>
        </div>
    );
}
