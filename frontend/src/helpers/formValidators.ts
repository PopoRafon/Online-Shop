import type { RegisterFormData, RegisterFormErrors } from '@components/Register/types';
import type { LoginFormData, LoginFormErrors } from '@components/Login/types';
import type { PasswordResetFormData, PasswordResetFormErrors } from '@components/Password/Reset/types';
import type { PasswordResetConfirmFormData, PasswordResetConfirmFormErrors } from '@components/Password/ResetConfirm/types';
import type { SettingsFormData, SettingsFormErrors } from '@components/Settings/types';

type IsFormValidArgs<Data, Errors> = {
    formData: Data;
    setFormErrors: React.Dispatch<React.SetStateAction<Errors>>;
}

/**
 * Validates provided form data and updates errors by using provided state setter function.
 * 
 * @param {Object} args
 * @param {RegisterFormData} args.formData Object containing register form data to validate.
 * @param {React.Dispatch<React.SetStateAction<RegisterFormErrors>>} args.setFormErrors React state setter function for form errors.
 * @returns {boolean} Whether form data is valid or not.
 */
function isRegisterFormValid({ formData, setFormErrors }: IsFormValidArgs<RegisterFormData, RegisterFormErrors>): boolean {
    const newFormErrors: RegisterFormErrors = { email: '', username: '', password1: '', password2: '', rules: '' };

    if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) newFormErrors.email = 'Must be valid email address.';

    if (!formData.username.match(/^\w*$/)) newFormErrors.username = 'Must contain only letters, numbers and underscores.';
    else if (formData.username.length > 16) newFormErrors.username = 'Must not be longer than 16 characters.';
    else if (formData.username.length < 8) newFormErrors.username = 'Must not be shorter than 8 characters.';

    if (formData.password1.length < 8) newFormErrors.password1 = 'Must not be shorter than 8 characters.';

    if (formData.password1 !== formData.password2) newFormErrors.password2 = 'Must be the same as password.';

    if (!formData.rules) newFormErrors.rules = 'Must be accepted.';

    setFormErrors({ ...newFormErrors });

    return !Object.values(newFormErrors).some(field => field);
}

/**
 * Validates provided form data and updates errors by using provided state setter function.
 * 
 * @param {Object} args
 * @param {LoginFormData} args.formData Object containing login form data to validate.
 * @param {React.Dispatch<React.SetStateAction<LoginFormErrors>>} args.setFormErrors React state setter function for form errors.
 * @returns {boolean} Whether form data is valid or not.
 */
function isLoginFormValid({ formData, setFormErrors }: IsFormValidArgs<LoginFormData, LoginFormErrors>): boolean {
    const newFormErrors: LoginFormErrors = { username: '', password: '' };

    if (!formData.username.match(/^\w*$/) ||
        formData.username.length > 16 ||
        formData.username.length < 8
    ) newFormErrors.username = 'Username is incorrect.';

    if (formData.password.length < 8) newFormErrors.password = 'Password is incorrect.';

    setFormErrors({ ...newFormErrors });

    return !Object.values(newFormErrors).some(field => field);
}

/**
 * Validates provided form data and updates errors by using provided state setter function.
 * 
 * @param {Object} args
 * @param {PasswordResetFormData} args.formData Object containing password reset form data to validate.
 * @param {React.Dispatch<React.SetStateAction<PasswordResetFormErrors>>} args.setFormErrors React state setter function for form errors.
 * @returns {boolean} Whether form data is valid or not.
 */
function isPasswordResetFormValid({ formData, setFormErrors }: IsFormValidArgs<PasswordResetFormData, PasswordResetFormErrors>): boolean {
    const newFormErrors: PasswordResetFormErrors = { email: '' };

    if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) newFormErrors.email = 'Must be valid email address.';

    setFormErrors({ ...newFormErrors });

    return !Object.values(newFormErrors).some(field => field);
}

/**
 * Validates provided form data and updates errors by using provided state setter function.
 * 
 * @param {Object} args
 * @param {PasswordResetConfirmFormData} args.formData Object containing password reset confirm form data to validate.
 * @param {React.Dispatch<React.SetStateAction<PasswordResetConfirmFormErrors>>} args.setFormErrors React state setter function for form errors.
 * @returns {boolean} Whether form data is valid or not.
 */
function isPasswordResetConfirmFormValid({ formData, setFormErrors }: IsFormValidArgs<PasswordResetConfirmFormData, PasswordResetConfirmFormErrors>): boolean {
    const newFormErrors: PasswordResetConfirmFormErrors = { newPassword1: '', newPassword2: '' };

    if (formData.newPassword1.length < 8) newFormErrors.newPassword1 = 'Must not be shorter than 8 characters.';

    if (formData.newPassword1 !== formData.newPassword2) newFormErrors.newPassword2 = 'Must be the same as password.';

    setFormErrors({ ...newFormErrors });

    return !Object.values(newFormErrors).some(field => field);
}

/**
 * Validates provided form data and updates errors by using provided state setter function.
 * 
 * @param {Object} args
 * @param {string} args.formData Object containing reviews form data to validate.
 * @param {React.Dispatch<React.SetStateAction<string>>} args.setFormErrors React state setter function for form errors.
 * @returns {boolean} Whether form data is valid or not.
 */
function isReviewsFormValid({ formData, setFormErrors }: IsFormValidArgs<string, string>): boolean {
    let newFormData: string = '';

    if (formData.length < 4) newFormData = 'Must not be shorter than 4 characters.';
    else if (formData.length > 512) newFormData = 'Must not be longer than 512 characters.';

    setFormErrors(newFormData);

    return !newFormData;
}

/**
 * Validates provided form data and updates errors by using provided state setter function.
 * 
 * @param {Object} args
 * @param {SettingsFormData} args.formData Object containing settings form data to validate.
 * @param {React.Dispatch<React.SetStateAction<SettingsFormErrors>>} args.setFormErrors React state setter function for form errors.
 * @returns {boolean} Whether form data is valid or not.
 */
function isSettingsFormValid({ formData, setFormErrors }: IsFormValidArgs<SettingsFormData, SettingsFormErrors>): boolean {
    const newFormErrors: SettingsFormErrors = { email: '', username: '', first_name: '', last_name: '' }; // eslint-disable-line @typescript-eslint/naming-convention

    if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) newFormErrors.email = 'Must be valid email address.';

    if (!formData.username.match(/^\w*$/)) newFormErrors.username = 'Must contain only letters, numbers and underscores.';
    else if (formData.username.length > 16) newFormErrors.username = 'Must not be longer than 16 characters.';
    else if (formData.username.length < 8) newFormErrors.username = 'Must not be shorter than 8 characters.';

    if (formData.first_name && (!formData.first_name.match(/^[a-zA-Z]*$/) || formData.first_name.length >= 96)) {
        newFormErrors.first_name = 'Must be a real name.';
    }

    if (formData.last_name && (!formData.last_name.match(/^[a-zA-Z]*$/) || formData.last_name.length >= 96)) {
        newFormErrors.last_name = 'Must be a real surname.';
    }

    setFormErrors({ ...newFormErrors });

    return !Object.values(newFormErrors).some(field => field);
}

export { isRegisterFormValid, isLoginFormValid, isPasswordResetFormValid, isPasswordResetConfirmFormValid, isReviewsFormValid, isSettingsFormValid };
