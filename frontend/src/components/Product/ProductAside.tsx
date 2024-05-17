import type { Product } from '@interfaces/types';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { updateCart } from '@utils/cart';
import useUserContext from '@contexts/UserContext/useUserContext';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import PlusIcon from '@assets/images/icons/plus_icon.svg';
import MinusIcon from '@assets/images/icons/minus_icon.svg';

type ProductAsideProps = {
    product: Product;
}

export default function ProductAside({ product }: ProductAsideProps) {
    const { user } = useUserContext();
    const { setAlert } = useAlertContext();
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

    function addToCart() {
        if (user.isLoggedIn) {
            updateCart({ productId: product.id, setAlert });
        } else {
            const cart: string | null = localStorage.getItem('cart');

            if (cart) {
                const cartItems: string[] = JSON.parse(cart);

                if (!cartItems.includes(product.id)) {
                    cartItems.push(product.id);
                }

                localStorage.setItem('cart', JSON.stringify(cartItems));
            } else {
                localStorage.setItem('cart', JSON.stringify([product.id]));
            }

            setAlert({
                show: true,
                type: 'success',
                text: 'Product has been successfully added to your cart.'
            });
        }
    }

    return (
        <aside className="primary-border product-aside-container">
            <div className="product-aside-information-container">
                <span className="product-aside-information-cost">{(product.price * user.currency.multiplier).toFixed(2)}{user.currency.symbol}</span>
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
                className="primary-button product-aside-buy-button"
                onClick={addToCart}
            >
                Add to cart
            </button>
            <button
                className="primary-button product-aside-buy-button"
            >
                Buy and pay
            </button>
            <div className="primary-border product-aside-user-other-products-container">
                <Link
                    to={`/search?limit=40&user=${product.username}`}
                >
                    All seller's products
                </Link>
            </div>
        </aside>
    );
}
