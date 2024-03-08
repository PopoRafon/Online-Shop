import MenuIcon from '@assets/images/icons/menu_icon.svg';
import UserIcon from '@assets/images/icons/user_icon.svg';
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
                        alt="Menu"
                    />
                </button>
            </div>
            <div className="navigation-header-buttons-container">
                <button
                    className="navigation-header-button"
                >
                    <img
                        src={UserIcon}
                        className="navigation-header-button-icon"
                        alt="Account"
                    />
                </button>
                <button
                    className="navigation-header-button"
                >
                    <img
                        src={CartIcon}
                        className="navigation-header-button-icon"
                        alt="Cart"
                    />
                </button>
            </div>
        </div>
    );
}
