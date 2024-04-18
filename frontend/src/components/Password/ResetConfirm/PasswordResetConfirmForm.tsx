import type { FormEvent, ChangeEvent } from 'react';
import type { PasswordResetConfirmFormData, PasswordResetConfirmFormErrors } from './types';
import { useState } from 'react';
import { isPasswordResetConfirmFormValid } from '@helpers/formValidators';
import { passwordResetConfirm } from '@utils/password';
import { useNavigate } from 'react-router-dom';
import FormPasswordInput from '@components/AuthForm/FormPasswordInput';
import useAlertContext from '@contexts/AlertContext/useAlertContext';

export default function PasswordResetConfirmForm() {
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();
    const [formErrors, setFormErrors] = useState<PasswordResetConfirmFormErrors>({
        newPassword1: '',
        newPassword2: ''
    });
    const [formData, setFormData] = useState<PasswordResetConfirmFormData>({
        newPassword1: '',
        newPassword2: ''
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

        if (isPasswordResetConfirmFormValid({ formData, setFormErrors })) {
            passwordResetConfirm({ formData, setFormErrors, navigate, setAlert });
        }
    }

    return (
        <form
            noValidate
            className="auth-form"
            onSubmit={handleSubmit}
            aria-label="Password reset confirm form"
        >
            <FormPasswordInput
                label="New Password"
                name="newPassword1"
                value={formData.newPassword1}
                handleChange={handleChange}
                error={formErrors.newPassword1}
            />
            <FormPasswordInput
                label="Confirm New Password"
                name="newPassword2"
                value={formData.newPassword2}
                handleChange={handleChange}
                error={formErrors.newPassword2}
            />
            <input
                type="submit"
                value="Change Password"
                className="primary-button auth-form-submit"
            />
        </form>
    );
}
