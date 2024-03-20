import Cookies from 'js-cookie';

/**
 * Sends request to server inorder to obtain new csrf token.
 * If request succeeds sets received csrf token in cookies. 
 */
export default async function obtainCSRFToken(): Promise<void> {
    return await fetch('/api/csrftoken', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Cookies.set('csrftoken', data.success);
            }
        })
        .catch(error => {
            console.log(error);
        });
}
