import type { FormEvent, ChangeEvent } from 'react';
import type { PasswordResetFormData, PasswordResetFormErrors } from './types';
import { useState } from 'react';
import { isPasswordResetFormValid } from '@helpers/formValidators';
import { passwordReset } from '@utils/password';
import { useNavigate } from 'react-router-dom';
import FormInput from '@components/AuthForm/FormInput';
import useAlertContext from '@contexts/AlertContext/useAlertContext';

export default function PasswordResetForm() {
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();
    const [formErrors, setFormErrors] = useState<PasswordResetFormErrors>({ email: '' });
    const [formData, setFormData] = useState<PasswordResetFormData>({ email: '' });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (isPasswordResetFormValid({ formData, setFormErrors })) {
            passwordReset({ formData, setFormErrors, navigate, setAlert });
        }
    }

    return (
        <form
            noValidate
            className="auth-form"
            onSubmit={handleSubmit}
            aria-label="Password reset form"
        >
            <FormInput
                label="Email Address"
                name="email"
                value={formData.email}
                handleChange={handleChange}
                error={formErrors.email}
                type="email"
            />
            <input
                type="submit"
                value="Send"
                className="auth-form-submit"
            />
        </form>
    );
}
