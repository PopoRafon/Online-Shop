import type { ChangeEvent, FormEvent } from 'react';
import type { LoginFormData, LoginFormErrors } from './types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '@components/AuthForm/FormInput';
import FormPasswordInput from '@components/AuthForm/FormPasswordInput';

export default function LoginForm() {
    const [formErrors] = useState<LoginFormErrors>({
        username: '',
        password: '',
    });
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <form
            noValidate
            className="auth-form"
            onSubmit={handleSubmit}
        >
            <FormInput
                label="Username"
                name="username"
                value={formData.username}
                error={formErrors.username}
                handleChange={handleChange}
            />
            <FormPasswordInput
                label="Password"
                name="password"
                value={formData.password}
                error={formErrors.password}
                handleChange={handleChange}
            />
            <Link
                to='/'
            >
                Forgot password?
            </Link>
            <input
                type="submit"
                value="Sign in"
                className="auth-form-submit"
            />
        </form>
    );
}
