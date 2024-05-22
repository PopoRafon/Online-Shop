import { useEffect } from 'react';
import obtainCSRFToken from '@utils/csrfToken';
import PasswordChangeForm from '@components/Password/Change/PasswordChangeForm';

export default function PasswordChange() {
    useEffect(() => {
        obtainCSRFToken();
    }, []);

    return (
        <main className="auth-form-page">
            <section className="primary-border auth-form-container">
                <h2 className="auth-form-header">Password Change</h2>
                <PasswordChangeForm />
            </section>
        </main>
    );
}
