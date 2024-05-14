import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Currency from '@helpers/currency';
import CartIcon from '@assets/images/icons/cart_icon.svg';
import useUserContext from '@contexts/UserContext/useUserContext';
import Account from './Account/Account';
import SearchBar from './SearchBar/SearchBar';

export default function Navigation() {
    const { setUser } = useUserContext();
    const [currency, setCurrency] = useState<string>(localStorage.getItem('currency') as string);
    const currencyTypesRef = useRef<string[]>(Currency.getCurrencyTypes());

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        const { value } = event.target;

        setCurrency(value);
        Currency.changeCurrency(setUser, value);
        localStorage.setItem('currency', value);
    }

    return (
        <header>
            <nav className="primary-border navigation">
                <div className="navigation-buttons-container">
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
                <SearchBar />
                <div className="navigation-buttons-container">
                    <select
                        value={currency}
                        onChange={handleChange}
                        className="primary-border navigation-currency-changer"
                    >
                        {currencyTypesRef.current.map(currencyType => (
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
                        className="navigation-icon-container"
                    >
                        <img
                            src={CartIcon}
                            className="navigation-icon"
                            alt="Cart icon"
                        />
                    </Link>
                </div>
            </nav>
        </header>
    );
}
