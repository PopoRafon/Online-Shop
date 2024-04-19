import type { Product } from '@interfaces/types';
import { useState } from 'react';
import Cookies from 'js-cookie';
import useUserContext from '@contexts/UserContext/useUserContext';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import CartEntry from './CartEntry';

type CartContainerProps = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function CartContainer({ products, setProducts }: CartContainerProps) {
    const { user } = useUserContext();
    const { setAlert } = useAlertContext();
    const [totalPrice, setTotalPrice] = useState<number>(products.reduce((prev, current) => prev + current.price, 0));

    function handleProductRemoval(productId: string) {
        if (user.isLoggedIn) {
            const csrfToken: string = Cookies.get('csrftoken') ?? '';

            fetch('/api/cart', {
                method: 'DELETE',
                headers: {
                    /* eslint-disable @typescript-eslint/naming-convention */
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ product_id: productId })
                /* eslint-enable @typescript-eslint/naming-convention */
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const newProducts: Product[] = products.filter(product => product.id !== productId);

                        setProducts([...newProducts]);
                        setAlert({
                            show: true,
                            type: 'success',
                            text: 'Product from your cart has been successfully removed.'
                        });
                    }
                })
                .catch(() => {
                    setAlert({
                        show: true,
                        type: 'error',
                        text: 'Product could not be remove from your cart.'
                    });
                });
        } else {
            const cart: string | null = localStorage.getItem('cart');

            if (cart) {
                const cartItems: string[] = JSON.parse(cart);
                const newCartItems: string[] = cartItems.filter(item => item !== productId);
                const newProducts: Product[] = products.filter(product => product.id !== productId);

                setProducts([...newProducts]);
                setAlert({
                    show: true,
                    type: 'success',
                    text: 'Product from your cart has been successfully removed.'
                });
                localStorage.setItem('cart', JSON.stringify(newCartItems));
            }
        }
    }

    return (
        <div className="cart-container">
            <section className="cart-information">
                <h2 className="cart-information-header">Your cart</h2>
                <div className="cart-information-body">
                    {products.map(product => (
                        <CartEntry
                            product={product}
                            setTotalPrice={setTotalPrice}
                            handleProductRemoval={handleProductRemoval}
                            key={product.id}
                        />
                    ))}
                </div>
            </section>
            <aside className="primary-border cart-checkout">
                <div className="cart-products-cost">
                    <span style={{ fontSize: 'small' }}>Total price</span>
                    <span style={{ fontSize: 'large' }}>{totalPrice.toFixed(2)}$</span>
                </div>
                <button
                    className="primary-button cart-payment-button"
                >
                    Continue to payment
                </button>
            </aside>
        </div>
    );
}
