import type { User } from '@contexts/UserContext/UserContextProvider';
import type { AlertData } from '@contexts/AlertContext/AlertContextProvider';
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
                const { email, username, first_name, last_name } = data.success; // eslint-disable-line @typescript-eslint/naming-convention

                setUser(prev => ({
                    ...prev,
                    isLoggedIn: true,
                    email: email,
                    username: username,
                    firstName: first_name,
                    lastName: last_name
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
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

async function updateUserData({ formData, setFormErrors, setAlert, setUser }: UpdateUserDataArgs): Promise<void> {
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
                setAlert({
                    show: true,
                    type: 'success',
                    text: 'Your account information has been successfully updated.'
                });
            } else if (data.error) {
                setFormErrors(data.error);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export { getUserData, updateUserData };
