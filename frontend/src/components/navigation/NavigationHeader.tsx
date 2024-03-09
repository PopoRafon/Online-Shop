import Account from './Account';
import MenuIcon from '@assets/images/icons/menu_icon.svg';
import CartIcon from '@assets/images/icons/cart_icon.svg';

export default function NavigationHeader() {
    return (
        <div className="navigation-header">
            <div className="navigation-header-buttons-container">
                <button
                    className="navigation-header-button"
                >
                    <img
                        src={MenuIcon}
                        className="navigation-header-button-icon"
                        alt="Menu icon"
                    />
                </button>
            </div>
            <div className="navigation-header-buttons-container">
                <Account />
                <button
                    className="navigation-header-button"
                >
                    <img
                        src={CartIcon}
                        className="navigation-header-button-icon"
                        alt="Cart icon"
                    />
                </button>
            </div>
        </div>
    );
}
