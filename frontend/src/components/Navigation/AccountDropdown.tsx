import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import logout from '@utils/logout';
import GoogleIcon from '@assets/images/icons/google_icon.svg';

type AccountDropdownProps = {
    accountButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountDropdown({ accountButtonRef, setShowDropdown }: AccountDropdownProps) {
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();
    const { setAlert } = useAlertContext();
    const dropdownRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const clickEventListener = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if ((dropdownRef.current?.contains(target as Node) && target.tagName !== 'BUTTON' && target.tagName !== 'A') ||
                (accountButtonRef.current?.contains(target as Node)) ||
                event.button !== 0
            ) return;

            setShowDropdown(false);
        };

        document.addEventListener('click', clickEventListener);

        return () => {
            document.removeEventListener('click', clickEventListener);
        };
    }, [accountButtonRef, setShowDropdown]);

    return (
        <div
            ref={dropdownRef}
            className="primary-border navigation-header-account-dropdown"
            data-testid="account-dropdown"
        >
            <span>Welcome!</span>
            {user.isLoggedIn ? (
                <>
                    <Link
                        to='/my-products'
                        className="navigation-header-account-dropdown-button"
                    >
                        My products
                    </Link>
                    <Link
                        to='/'
                        className="navigation-header-account-dropdown-button"
                    >
                        Settings
                    </Link>
                    <button
                        className="navigation-header-account-dropdown-button"
                        onClick={() => logout({ setUser, setAlert, navigate })}
                    >
                        Logout
                    </button>
                </>
            ):(
                <>
                    <button
                        className="navigation-header-account-dropdown-button"
                        style={{ justifyContent: 'right' }}
                    >
                        Login with Google
                        <img
                            className="navigation-header-account-dropdown-google-icon"
                            src={GoogleIcon}
                            alt="Google icon"
                        />
                    </button>
                    <Link
                        to='/login'
                        className="navigation-header-account-dropdown-button"
                    >
                        Login
                    </Link>
                    <div style={{ textAlign: 'center' }}>
                        <span>Don't have an account?</span>
                        <Link
                            to='/register'
                        >
                            Register
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
