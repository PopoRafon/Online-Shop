import { useEffect } from 'react';
import obtainCSRFToken from '@utils/csrfToken';
import RegisterForm from '@components/Register/RegisterForm';

export default function Register() {
    useEffect(() => {
        obtainCSRFToken();
    }, []);

    return (
        <main className="auth-form-page">
            <section className="auth-form-container">
                <h2 className="auth-form-header">Create an account</h2>
                <RegisterForm />
            </section>
        </main>
    );
}
