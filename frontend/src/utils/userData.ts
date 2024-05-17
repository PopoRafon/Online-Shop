import type { User } from '@contexts/UserContext/UserContextProvider';
import type { SettingsFormData, SettingsFormErrors } from '@components/Settings/types';
import Cookies from 'js-cookie';

type GetUserDataArgs = {
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

/**
 * Sends request to server to retrieve data from currently logged in user.
 * 
 * If request succeeds calls `setUser` function and passes received data as arguments.
 */
async function getUserData({ setUser }: GetUserDataArgs): Promise<void> {
    return await fetch('/api/user', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setUser(prev => ({
                    ...prev,
                    isLoggedIn: true,
                    ...data.success
                }));
            }
        })
        .catch(error => {
            console.log(error);
        });
}

type UpdateUserDataArgs = {
    formData: SettingsFormData;
    setFormErrors: React.Dispatch<React.SetStateAction<SettingsFormErrors>>;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

async function updateUserData({ formData, setFormErrors, setUser }: UpdateUserDataArgs): Promise<void> {
    const csrfToken: string = Cookies.get('csrftoken') ?? '';

    return await fetch('/api/user', {
        method: 'PATCH',
        headers: {
            'X-CSRFToken': csrfToken, // eslint-disable-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json' // eslint-disable-line @typescript-eslint/naming-convention
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setUser(prev => ({
                    ...prev,
                    ...data.success
                }));
            } else if (data.error) {
                setFormErrors(data.error);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export { getUserData, updateUserData };
