import type { User } from '@contexts/UserContext/UserContextProvider';

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
                setUser({ isLoggedIn: true, ...data.success });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export { getUserData };
