import type { Product } from '@interfaces/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';
import CartImage from '@assets/images/cart.svg';

export default function Cart() {
    const { user } = useUserContext();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            if (user.isLoggedIn) {
                await fetch('/api/cart', {
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            setProducts(data.success);
                        }
                    });
            } else {
                const cart: string | null = localStorage.getItem('cart');

                if (cart) {
                    const cartItems: string[] = JSON.parse(cart);
                    const newProducts: Product[] = [];

                    for (const item of cartItems) {
                        await fetch(`/api/products/${item}`, {
                            method: 'GET'
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    newProducts.push(data.success);
                                }
                            });
                    }

                    setProducts([...newProducts]);
                }
            }

            setIsLoaded(true);
        })();
    }, [user.isLoggedIn]);

    return isLoaded && (
        <main className="cart-page">
            {products.length > 0 ? (
                <section>
                    <h2>Your cart.</h2>
                    {products.map(product => (
                        <div key={product.id}>{product.name}</div>
                    ))}
                </section>
            ) : (
                <section className="cart-empty-container">
                    <img
                        src={CartImage}
                        width={125}
                        height={125}
                        alt="Cart image"
                    />
                    <h3 className="cart-empty-header">Your cart is empty. Go ahead and add some cool stuff to it!</h3>
                    {!user.isLoggedIn && (
                        <span className="cart-empty-info">Or <Link to='/login'>sign in</Link> to check if there's something in it already!</span>
                    )}
                    <Link
                        to='/'
                        className="cart-empty-browse-button"
                    >
                        Browse store
                    </Link>
                </section>
            )}
        </main>
    );
}
