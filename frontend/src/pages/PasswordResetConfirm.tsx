import { useEffect } from 'react';
import obtainCSRFToken from '@utils/csrfToken';
import PasswordResetConfirmForm from '@components/Password/ResetConfirm/PasswordResetConfirmForm';

export default function PasswordResetConfirm() {
    useEffect(() => {
        obtainCSRFToken();
    }, []);

    return (
        <main className="auth-form-page">
            <section className="auth-form-container">
                <h2 className="auth-form-header">Confirm Password Reset</h2>
                <PasswordResetConfirmForm />
            </section>
        </main>
    );
}
