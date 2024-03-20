import type { NavigateFunction } from 'react-router-dom';
import type { LoginFormData, LoginFormErrors } from '@components/Login/types';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import type { User } from '@contexts/UserContext/UserContextProvider';
import { getUserData } from './userData';
import Cookies from 'js-cookie';
import AccessToken from './accessToken';

type LoginArgs = {
    formData: LoginFormData;
    setFormErrors: React.Dispatch<React.SetStateAction<LoginFormErrors>>;
    navigate: NavigateFunction;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

/**
 * Sends request to server with provided form data.
 * 
 * If request succeeds calls `getUserData`, `setAlert`, `setPeriodicTokenRefresh` functions and navigates user to home page.
 */
export default async function login({ formData, setFormErrors, navigate, setAlert, setUser }: LoginArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';

    return await fetch('/api/login', {
        method: 'POST',
        headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'X-CSRFToken': csrfToken,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(async (data) => {
            if (data.success) {
                await getUserData({ setUser });
                setAlert({ show: true, text: 'You have been successfully logged in.' });
                AccessToken.setPeriodicTokenRefresh();
                navigate('/');
            } else if (data.error) {
                setFormErrors({ ...data.error });
            }
        })
        .catch(error => {
            console.log(error);
        });
}
