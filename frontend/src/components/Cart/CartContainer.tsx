import type { Product } from '@interfaces/types';
import { useState } from 'react';
import CartEntry from './CartEntry';

type CartContainerProps = {
    products: Product[]
}

export default function CartContainer({ products }: CartContainerProps) {
    const [totalPrice, setTotalPrice] = useState<number>(products.reduce((prev, current) => prev + Number(current.price), 0));

    return (
        <div className="cart-container">
            <section className="cart-information">
                <h2 className="cart-information-header">Your cart</h2>
                <div className="cart-information-body">
                    {products.map(product => (
                        <CartEntry
                            product={product}
                            setTotalPrice={setTotalPrice}
                            key={product.id}
                        />
                    ))}
                </div>
            </section>
            <aside className="primary-border cart-checkout">
                <div className="cart-products-cost">
                    <span style={{ fontSize: 'small' }}>Total price</span>
                    <span style={{ fontSize: 'large' }}>{Number(totalPrice).toFixed(2)}$</span>
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
