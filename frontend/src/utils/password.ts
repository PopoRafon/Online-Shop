import type { NavigateFunction } from 'react-router-dom';
import type { PasswordResetFormData, PasswordResetFormErrors } from '@components/Password/Reset/types';
import type { PasswordResetConfirmFormData, PasswordResetConfirmFormErrors } from '@components/Password/ResetConfirm/types';
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

type PasswordResetConfirmArgs = {
    formData: PasswordResetConfirmFormData;
    setFormErrors: React.Dispatch<React.SetStateAction<PasswordResetConfirmFormErrors>>;
    navigate: NavigateFunction;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
}

/**
 * Sends request to server with provided form data.
 * 
 * If request succeeds calls `setAlert` function and navigates user to login page.
 */
async function passwordResetConfirm({ formData, setFormErrors, navigate, setAlert }: PasswordResetConfirmArgs) {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';
    const pathname: string[] = window.location.pathname.split('/');
    const uidb64: string = pathname[pathname.length - 2];
    const token: string = pathname[pathname.length - 1];

    return await fetch(`/api/password/reset/confirm/${uidb64}/${token}`, {
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
                setAlert({ show: true, text: 'Your password has been successfully changed. Now you can login to your account.' });
                navigate('/login');
            } else if (data.error) {
                setFormErrors({ ...data.error });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export { passwordReset, passwordResetConfirm };
