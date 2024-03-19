import type { NavigateFunction } from 'react-router-dom';
import type { RegisterFormData, RegisterFormErrors } from '@components/Register/types';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import Cookies from 'js-cookie';

type RegisterArgs = {
    formData: RegisterFormData;
    setFormErrors: React.Dispatch<React.SetStateAction<RegisterFormErrors>>;
    navigate: NavigateFunction;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
}

/**
 * Sends request to server register endpoint.
 * If request succeeds navigates user to home page.
 */
export default async function register({ formData, setFormErrors, navigate, setAlert }: RegisterArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';

    return await fetch('/api/register', {
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
        .then(data => {
            if (data.success) {
                setAlert({ show: true, text: 'Your account has been successfully created.' });
                navigate('/');
            } else if (data.error) {
                setFormErrors({ ...data.error });
            }
        })
        .catch(error => {
            console.log(error);
        });
}
