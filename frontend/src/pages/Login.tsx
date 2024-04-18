import { useEffect } from 'react';
import obtainCSRFToken from '@utils/csrfToken';
import LoginForm from '@components/Login/LoginForm';

export default function Login() {
    useEffect(() => {
        obtainCSRFToken();
    }, []);

    return (
        <main className="auth-form-page">
            <section className="primary-border auth-form-container">
                <h2 className="auth-form-header">Sign in</h2>
                <LoginForm />
            </section>
        </main>
    );
}
