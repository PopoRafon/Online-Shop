import type { Product } from '@interfaces/types';
import { useEffect, useState } from 'react';
import useUserContext from '@contexts/UserContext/useUserContext';
import CartContainer from '@components/Cart/CartContainer';
import EmptyCart from '@components/Cart/EmptyCart';

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
                <CartContainer
                    products={products}
                    setProducts={setProducts}
                />
            ) : (
                <EmptyCart />
            )}
        </main>
    );
}
