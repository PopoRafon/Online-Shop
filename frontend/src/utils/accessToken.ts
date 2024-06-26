import Cookies from 'js-cookie';

/**
 * Provides methods for refreshing access tokens.
 */
export default class AccessToken {
    private static tokenRefreshInterval: NodeJS.Timeout;
    private static readonly tokenRefreshTime: number = 19 * 60 * 1e3;

    /**
     * Refreshes access token on specified intervals.
     * Removes interval if token refresh doesn't succeed.
     */
    static setPeriodicTokenRefresh(): void {
        clearInterval(this.tokenRefreshInterval);

        this.tokenRefreshInterval = setInterval(() => {
            const csrfToken: string = Cookies.get('csrftoken') ?? '';

            fetch('/api/token/refresh', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        clearInterval(this.tokenRefreshInterval);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }, this.tokenRefreshTime);
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
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
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
