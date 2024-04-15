import type { NavigateFunction } from 'react-router-dom';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import type { User } from '@contexts/UserContext/UserContextProvider';
import Cookies from 'js-cookie';

type LogoutArgs = {
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
    navigate: NavigateFunction;
}

/**
 * Sends request to server inorder to logout user.
 * 
 * If request succeeds calls `setUser`, `setAlert` functions and navigates user to home page.
 */
export default async function logout({ setUser, setAlert, navigate }: LogoutArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';

    return await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setUser({ isLoggedIn: false, username: '' });
                setAlert({ show: true, text: 'You have been successfully logged out.' });
                navigate('/');
            }
        })
        .catch(error => {
            console.log(error);
        });
}
