import type { RegisterFormData } from '@components/Register/types';
import type { LoginFormData } from '@components/Login/types';
import { test, describe, expect, vi } from 'vitest';
import { isRegisterFormValid, isLoginFormValid } from '@helpers/formValidators';

describe('isRegisterFormValid helper', () => {
    test('returns false and calls setFormErrors function with errors that occurred while validating form', () => {
        const setFormErrorsMock = vi.fn();
        const formData: RegisterFormData = {
            email: 'notvalidemailaddress',
            username: 'username!@#',
            password1: 'passwd',
            password2: 'passwd2',
            rules: false
        };
        const isFormValid = isRegisterFormValid({
            formData: formData,
            setFormErrors: setFormErrorsMock
        });

        expect(isFormValid).toBeFalsy();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toBeCalledWith({
            email: 'Must be valid email address.',
            username: 'Must contain only letters, numbers and underscores.',
            password1: 'Must not be shorter than 8 characters.',
            password2: 'Must be the same as password.',
            rules: 'Must be accepted.'
        });
    });

    test('returns true and calls setFormErrors with empty strings', () => {
        const setFormErrorsMock = vi.fn();
        const formData: RegisterFormData = {
            email: 'testemail@gmail.com',
            username: 'username',
            password1: 'password',
            password2: 'password',
            rules: true
        };
        const isFormValid = isRegisterFormValid({
            formData: formData,
            setFormErrors: setFormErrorsMock
        });

        expect(isFormValid).toBeTruthy();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toBeCalledWith({ email: '', username: '', password1: '', password2: '', rules: '' });
    });
});

describe('isLoginFormValid helper', () => {
    test('returns false and calls setFormErrors function with errors that occurred while validating form', () => {
        const setFormErrorsMock = vi.fn();
        const formData: LoginFormData = {
            username: 'user!@#',
            password: 'passwd'
        };
        const isFormValid = isLoginFormValid({
            formData: formData,
            setFormErrors: setFormErrorsMock
        });

        expect(isFormValid).toBeFalsy();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toBeCalledWith({
            username: 'Username is incorrect.',
            password: 'Password is incorrect.'
        });
    });

    test('returns true and calls setFormErrors with empty strings', () => {
        const setFormErrorsMock = vi.fn();
        const formData: LoginFormData = {
            username: 'testusername',
            password: 'testpassword'
        };
        const isFormValid = isLoginFormValid({
            formData: formData,
            setFormErrors: setFormErrorsMock
        });

        expect(isFormValid).toBeTruthy();
        expect(setFormErrorsMock).toHaveBeenCalledOnce();
        expect(setFormErrorsMock).toBeCalledWith({ username: '', password: '' });
    });
});
