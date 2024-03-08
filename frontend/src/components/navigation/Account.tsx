import { useState, useRef } from 'react';
import AccountIcon from '@assets/images/icons/account_icon.svg';
import AccountDropdown from './AccountDropdown';

export default function Account() {
    const accountButtonRef = useRef<null | HTMLButtonElement>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    return (
        <div style={{ position: 'relative' }}>
            <button
                ref={accountButtonRef}
                className="navigation-header-button"
                onClick={() => setShowDropdown(prev => !prev)}
            >
                <img
                    src={AccountIcon}
                    className="navigation-header-button-icon"
                    alt="Account"
                />
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
