import Cookies from 'js-cookie';

/**
 * Sends request to server csrftoken endpoint.
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
