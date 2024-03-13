import { useEffect } from 'react';
import obtainCSRFToken from '@utils/csrfToken';
import RegisterForm from '@components/register/RegisterForm';

export default function Register() {
    useEffect(() => {
        obtainCSRFToken();
    }, []);

    return (
        <main className="register-page">
            <section className="register-container">
                <h2 className="register-header">Create an account</h2>
                <RegisterForm />
            </section>
        </main>
    );
}
