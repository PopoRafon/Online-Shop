import type { RegisterFormData, RegisterFormErrors } from '@components/Register/types';
import type { LoginFormData, LoginFormErrors } from '@components/Login/types';

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
 * @param {RegisterFormData} args.formData Object containing login form data to validate.
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

export { isRegisterFormValid, isLoginFormValid };
