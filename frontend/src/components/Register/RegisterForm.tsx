import type { ChangeEvent, FormEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from './types';
import { isRegisterFormValid } from '@helpers/formValidators';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import register from '@utils/register';
import FormInput from '@components/AuthForm/FormInput';
import FormPasswordInput from '@components/AuthForm/FormPasswordInput';

export default function RegisterForm() {
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    const { setAlert } = useAlertContext();
    const [formErrors, setFormErrors] = useState<RegisterFormErrors>({
        email: '',
        username: '',
        password1: '',
        password2: '',
        rules: ''
    });
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        username: '',
        password1: '',
        password2: '',
        rules: false
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, checked } = event.target;

        if (name === 'rules') {
            setFormData({
                ...formData,
                rules: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (isRegisterFormValid({ formData, setFormErrors })) {
            register({ formData, navigate, setFormErrors, setAlert, setUser });
        }
    }

    return (
        <form
            noValidate
            className="auth-form"
            onSubmit={handleSubmit}
            aria-label="Register form"
        >
            <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                error={formErrors.email}
                handleChange={handleChange}
            />
            <FormInput
                label="Username"
                name="username"
                value={formData.username}
                error={formErrors.username}
                handleChange={handleChange}
            />
            <FormPasswordInput
                label="Password"
                name="password1"
                value={formData.password1}
                error={formErrors.password1}
                handleChange={handleChange}
            />
            <FormPasswordInput
                label="Confirm Password"
                name="password2"
                value={formData.password2}
                error={formErrors.password2}
                handleChange={handleChange}
            />
            <label className="auth-form-checkbox-label">
                <input
                    name="rules"
                    type="checkbox"
                    className="auth-form-checkbox"
                    onChange={handleChange}
                    checked={formData.rules}
                />
                <span style={{ color: `${formErrors.rules && '#FF5050'}` }}>I agree with Terms of Service</span>
            </label>
            <input
                type="submit"
                value="Create Account"
                className="auth-form-submit"
            />
        </form>
    );
}
