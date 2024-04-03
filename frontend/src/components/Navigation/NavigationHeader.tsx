import { Link } from 'react-router-dom';
import Account from './Account';
import CartIcon from '@assets/images/icons/cart_icon.svg';

export default function NavigationHeader() {
    return (
        <div className="navigation-header">
            <div className="navigation-header-buttons-container">
                <Link
                    to='/'
                >
                    <img
                        src="/logo.png"
                        style={{ verticalAlign: 'middle' }}
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="navigation-header-buttons-container">
                <Account />
                <Link
                    to='/cart'
                    className="navigation-header-button"
                >
                    <img
                        src={CartIcon}
                        className="navigation-header-button-icon"
                        alt="Cart icon"
                    />
                </Link>
            </div>
        </div>
    );
}
