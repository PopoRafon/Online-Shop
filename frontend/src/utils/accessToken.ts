import Cookies from 'js-cookie';

/**
 * Provides methods for refreshing access tokens.
 */
export default class AccessToken {
    static #tokenRefreshInterval: number;
    static #tokenRefreshTime: number = 19 * 60 * 1e3;

    /**
     * Refreshes access token on specified intervals.
     * Removes interval if token refresh doesn't succeed.
     */
    static setPeriodicTokenRefresh(): void {
        clearInterval(this.#tokenRefreshInterval);

        this.#tokenRefreshInterval = setInterval(async () => {
            const csrfToken: string = Cookies.get('csrftoken') ?? '';

            fetch('/api/token/refresh', {
                method: 'POST',
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'X-CSRFToken': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        clearInterval(this.#tokenRefreshInterval);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }, this.#tokenRefreshTime);
    }

    /**
     * Refreshes access token.
     * Invokes `setPeriodicTokenRefresh` method if token refresh succeeds.
     */
    static async refreshToken(): Promise<void> {
        const csrfToken: string = Cookies.get('csrftoken') ?? '';

        return await fetch('/api/token/refresh', {
            method: 'POST',
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'X-CSRFToken': csrfToken
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setPeriodicTokenRefresh();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}
