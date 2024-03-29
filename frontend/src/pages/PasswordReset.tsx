import { useEffect } from 'react';
import obtainCSRFToken from '@utils/csrfToken';
import PasswordResetForm from '@components/Password/Reset/PasswordResetForm';

export default function PasswordReset() {
    useEffect(() => {
        obtainCSRFToken();
    }, []);

    return (
        <main className="auth-form-page">
            <section className="auth-form-container">
                <h2 className="auth-form-header">Reset Password</h2>
                <PasswordResetForm />
            </section>
        </main>
    );
}
