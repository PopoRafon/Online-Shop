import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '@assets/images/icons/google_icon.svg';

type AccountDropdownProps = {
    accountButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountDropdown({ accountButtonRef, setShowDropdown }: AccountDropdownProps) {
    const dropdownRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const mouseDownEventListener = (event: MouseEvent) => {
            if ((dropdownRef.current?.contains(event.target as Node)) ||
                (accountButtonRef.current?.contains(event.target as Node)) ||
                event.button !== 0
            ) return;

            setShowDropdown(false);
        };

        document.addEventListener('mousedown', mouseDownEventListener);

        return () => {
            document.removeEventListener('mousedown', mouseDownEventListener);
        };
    }, [accountButtonRef, setShowDropdown]);

    return (
        <div
            ref={dropdownRef}
            className="navigation-header-account-dropdown"
            data-testid="account-dropdown"
        >
            <span>Welcome!</span>
            <button
                className="navigation-header-account-dropdown-button"
                style={{ textAlign: 'right' }}
            >
                Login with Google
                <img
                    className="navigation-header-account-dropdown-google-icon"
                    src={GoogleIcon}
                    alt="Google icon"
                />
            </button>
            <button
                className="navigation-header-account-dropdown-button"
            >
                Login
            </button>
            <div style={{ textAlign: 'center' }}>
                <span>Don't have an account?</span>
                <Link
                    to='/register'
                    onClick={() => setShowDropdown(false)}
                >
                    Register
                </Link>
            </div>
        </div>
    );
}
