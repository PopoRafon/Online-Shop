import { useState, useRef } from 'react';
import AccountIcon from '@assets/images/icons/account_icon.svg';
import AccountDropdown from './AccountDropdown';
import useUserContext from '@contexts/UserContext/useUserContext';

export default function Account() {
    const { user } = useUserContext();
    const accountButtonRef = useRef<null | HTMLButtonElement>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    return (
        <div style={{ position: 'relative' }}>
            <button
                ref={accountButtonRef}
                className="navigation-account-button"
                onClick={() => setShowDropdown(prev => !prev)}
            >
                <div className="navigation-icon-container">
                    <img
                        src={AccountIcon}
                        className="navigation-icon"
                        alt="Account icon"
                    />
                </div>
                <span className="navigation-account-text">
                    {user.isLoggedIn ? user.username : 'sign in/sign up'}
                </span>
            </button>
            {showDropdown && (
                <AccountDropdown
                    accountButtonRef={accountButtonRef}
                    setShowDropdown={setShowDropdown}
                />
            )}
        </div>
    );
}
