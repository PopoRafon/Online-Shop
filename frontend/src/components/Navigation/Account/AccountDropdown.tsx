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
            className="primary-border navigation-account-dropdown"
            data-testid="account-dropdown"
        >
            <h4 className="navigation-account-dropdown-header">Welcome!</h4>
            {user.isLoggedIn ? (
                <>
                    <Link
                        to='/my-products'
                        className="navigation-account-dropdown-button"
                    >
                        My products
                    </Link>
                    <Link
                        to='/'
                        className="navigation-account-dropdown-button"
                    >
                        Settings
                    </Link>
                    <button
                        className="navigation-account-dropdown-button"
                        onClick={() => logout({ setUser, setAlert, navigate })}
                    >
                        Logout
                    </button>
                </>
            ):(
                <>
                    <button className="navigation-account-dropdown-button">
                        <span style={{ marginLeft: '0.75rem' }}>Login with Google</span>
                        <img
                            className="navigation-account-dropdown-google-icon"
                            src={GoogleIcon}
                            alt="Google icon"
                        />
                    </button>
                    <Link
                        to='/login'
                        className="navigation-account-dropdown-button"
                    >
                        Login
                    </Link>
                    <div className="navigation-account-dropdown-footer" style={{ textAlign: 'center' }}>
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
