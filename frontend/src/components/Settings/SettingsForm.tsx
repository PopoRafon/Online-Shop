import type { ChangeEvent, FormEvent } from 'react';
import type { SettingsFormData, SettingsFormErrors } from './types';
import { useState } from 'react';
import { isSettingsFormValid } from '@helpers/formValidators';
import { updateUserData } from '@utils/userData';
import useUserContext from '@contexts/UserContext/useUserContext';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import FormInput from '@components/AuthForm/FormInput';

export default function SettingsForm() {
    const { setAlert } = useAlertContext();
    const { user, setUser } = useUserContext();
    /* eslint-disable @typescript-eslint/naming-convention */
    const [formErrors, setFormErrors] = useState<SettingsFormErrors>({ email: '', username: '', first_name: '', last_name: '' });
    const [formData, setFormData] = useState<SettingsFormData>({
        email: user.email,
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName
    });
    /* eslint-enable @typescript-eslint/naming-convention */

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
            updateUserData({ formData, setFormErrors, setAlert, setUser });
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
                name="first_name"
                value={formData.first_name}
                handleChange={handleChange}
                error={formErrors.first_name}
            />
            <FormInput
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                handleChange={handleChange}
                error={formErrors.last_name}
            />
            <input
                type="submit"
                value="Update settings"
                className="primary-button auth-form-submit"
            /> 
        </form>
    );
}
