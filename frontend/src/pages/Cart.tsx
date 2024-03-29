import { Link } from 'react-router-dom';
import CartImage from '@assets/images/cart.svg';

export default function Cart() {
    return (
        <main className="cart-page">
            <img
                src={CartImage}
                width={125}
                height={125}
                alt="Cart image"
            />
            <h3 className="cart-header">Your cart is empty. Go ahead and add some cool stuff to it!</h3>
            <span className="cart-info">Or <Link to='/login'>sign in</Link> to check if there's something in it already!</span>
            <Link
                to='/'
                className="cart-browse-button"
            >
                Browse store
            </Link>
        </main>
    );
}