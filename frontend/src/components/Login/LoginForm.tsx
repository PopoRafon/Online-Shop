import type { ChangeEvent, FormEvent } from 'react';
import type { LoginFormData, LoginFormErrors } from './types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoginFormValid } from '@helpers/formValidators';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import login from '@utils/login';
import FormInput from '@components/AuthForm/FormInput';
import FormPasswordInput from '@components/AuthForm/FormPasswordInput';

export default function LoginForm() {
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();
    const [formErrors, setFormErrors] = useState<LoginFormErrors>({
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

        if (isLoginFormValid({ formData, setFormErrors })) {
            login({ formData, setFormErrors, navigate, setAlert });
        }
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
