import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Currency from '@helpers/currency';
import Account from './Account';
import CartIcon from '@assets/images/icons/cart_icon.svg';

export default function NavigationHeader() {
    const [currency, setCurrency] = useState<string>(localStorage.getItem('currency') as string);

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        const { value } = event.target;

        setCurrency(value);
        localStorage.setItem('currency', value);
    }

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
                <select
                    value={currency}
                    onChange={handleChange}
                    className="primary-border navigation-header-currency-changer"
                >
                    {Object.keys(Currency.currencyTypes).map(currencyType => (
                        <option
                            value={currencyType}
                            key={currencyType}
                        >
                            {currencyType}
                        </option>
                    ))}
                </select>
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
