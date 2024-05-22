import type { PasswordChangeFormData, PasswordChangeFormErrors } from './types';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { isPasswordChangeFormValid } from '@helpers/formValidators';
import { passwordChange } from '@utils/password';
import { useNavigate } from 'react-router-dom';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import FormPasswordInput from '@components/AuthForm/FormPasswordInput';

export default function PasswordChangeForm() {
    const navigate = useNavigate();
    const { setAlert } = useAlertContext();
    const [formData, setFormData] = useState<PasswordChangeFormData>({ oldPassword: '', newPassword1: '', newPassword2: '' });
    const [formErrors, setFormErrors] = useState<PasswordChangeFormErrors>({ oldPassword: '', newPassword1: '', newPassword2: '' });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (isPasswordChangeFormValid({ formData, setFormErrors })) {
            passwordChange({ formData, setFormErrors, navigate, setAlert });
        }
    }


    return (
        <form
            noValidate
            className="auth-form"
            onSubmit={handleSubmit}
            aria-label="Password change form"
        >
            <FormPasswordInput
                label="Old Password"
                name="oldPassword"
                value={formData.oldPassword}
                handleChange={handleChange}
                error={formErrors.oldPassword}
            />
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
