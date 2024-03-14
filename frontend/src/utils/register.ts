import type { NavigateFunction } from 'react-router-dom';
import type { RegisterFormData } from '@components/register/types';
import Cookies from 'js-cookie';

type RegisterArgs = {
    formData: RegisterFormData;
    navigate: NavigateFunction;
}

/**
 * Sends request to server register endpoint.
 * If request succeeds navigates user to home page.
 */
export default async function register({ formData, navigate }: RegisterArgs): Promise<void> {
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
                navigate('/');
            } else if (data.error) {
                console.log(data.error);
            }
        })
        .catch(error => {
            console.log(error);
        });
}
