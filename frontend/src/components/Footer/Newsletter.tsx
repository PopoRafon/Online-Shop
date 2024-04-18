import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

export default function Newsletter() {
    const [emailData, setEmailData] = useState<string>('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setEmailData(value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
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
                    value={emailData}
                    onChange={handleChange}
                    className="primary-border footer-newsletter-form-input"
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
