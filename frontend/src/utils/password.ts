import type { NavigateFunction } from 'react-router-dom';
import type { PasswordResetFormData, PasswordResetFormErrors } from '@components/Password/Reset/types';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
import Cookies from 'js-cookie';

type PasswordResetArgs = {
    formData: PasswordResetFormData;
    setFormErrors: React.Dispatch<React.SetStateAction<PasswordResetFormErrors>>;
    navigate: NavigateFunction;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
}

/**
 * Sends request to server with provided form data.
 * 
 * If request succeeds calls `setAlert` function and navigates user to home page.
 */
async function passwordReset({ formData, setFormErrors, navigate, setAlert }: PasswordResetArgs) {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';

    return await fetch('/api/password/reset', {
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
                setAlert({ show: true, text: 'Password reset message has been sent to your email.' });
                navigate('/');
            } else if (data.error) {
                setFormErrors({ ...data.error });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export { passwordReset };
