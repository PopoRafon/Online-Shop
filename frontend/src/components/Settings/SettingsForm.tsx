import type { ChangeEvent, FormEvent } from 'react';
import type { SettingsFormData, SettingsFormErrors } from './types';
import { useState } from 'react';
import { isSettingsFormValid } from '@helpers/formValidators';
import { updateUserData } from '@utils/userData';
import useUserContext from '@contexts/UserContext/useUserContext';
import FormInput from '@components/AuthForm/FormInput';

export default function SettingsForm() {
    const { user, setUser } = useUserContext();
    const [formData, setFormData] = useState<SettingsFormData>({ email: user.email, username: user.username, firstName: '', lastName: '' });
    const [formErrors, setFormErrors] = useState<SettingsFormErrors>({ email: '', username: '', firstName: '', lastName: '' });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSettingsFormValid({ formData, setFormErrors })) {
            updateUserData({ formData, setFormErrors, setUser });
        }
    }

    return (
        <form
            noValidate
            aria-label="Account update form"
            className="auth-form"
            onSubmit={handleSubmit}
        >
            <FormInput
                label="Email Address"
                name="email"
                value={formData.email}
                handleChange={handleChange}
                error={formErrors.email}
            />
            <FormInput
                label="Username"
                name="username"
                value={formData.username}
                handleChange={handleChange}
                error={formErrors.username}
            />
            <FormInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                handleChange={handleChange}
                error={formErrors.firstName}
            />
            <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                handleChange={handleChange}
                error={formErrors.lastName}
            />
            <input
                type="submit"
                value="Update settings"
                className="primary-button auth-form-submit"
            /> 
        </form>
    );
}
