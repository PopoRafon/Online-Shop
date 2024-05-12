import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import useAlertContext from '@contexts/AlertContext/useAlertContext';

export default function Newsletter() {
    const { setAlert } = useAlertContext();
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setEmail(value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const csrfToken: string = Cookies.get('csrftoken') ?? '';

        if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
            setEmailError('You must provide valid email address');
            return;
        }

        fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken, // eslint-disable-line @typescript-eslint/naming-convention
                'Content-Type': 'application/json' // eslint-disable-line @typescript-eslint/naming-convention
            },
            body: JSON.stringify({ email: email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setEmail('');
                    setEmailError('');
                    setAlert({
                        show: true,
                        type: 'success',
                        text: 'Your email has been successfully added to our newsletter.'
                    });
                } else if (data.error) {
                    setAlert({
                        show: true,
                        type: 'error',
                        text: 'Your email is already subscribing to our newsletter.'
                    });
                }
            });
    }

    return (
        <div className="footer-newsletter">
            <h3 className="footer-newsletter-header">Grab a 10% discount code for your next purchase</h3>
            <form
                noValidate
                className="footer-newsletter-form"
                onSubmit={handleSubmit}
                aria-label="Newsletter form"
            >
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className={`primary-border footer-newsletter-form-input ${emailError && 'footer-newsletter-form-input-error'}`}
                    placeholder="Enter your email"
                    autoComplete="off"
                />
                <input
                    type="submit"
                    value="Subscribe"
                    className="primary-button footer-newsletter-form-submit"
                />
            </form>
        </div>
    );
}
