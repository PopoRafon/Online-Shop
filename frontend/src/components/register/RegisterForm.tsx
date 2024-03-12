import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import FormInput from './FormInput';
import FormPasswordInput from './FormPasswordInput';

type RegisterFormData = {
    email: string;
    username: string;
    password1: string;
    password2: string;
    acceptRules: boolean;
}

export default function RegisterForm() {
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        username: '',
        password1: '',
        password2: '',
        acceptRules: false
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, checked } = event.target;

        if (name === 'acceptRules') {
            setFormData({
                ...formData,
                acceptRules: checked
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
    }

    return (
        <form
            noValidate
            className="register-form"
            onSubmit={handleSubmit}
        >
            <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                handleChange={handleChange}
            />
            <FormInput
                label="Username"
                name="username"
                value={formData.username}
                handleChange={handleChange}
            />
            <FormPasswordInput
                label="Password"
                name="password1"
                value={formData.password1}
                handleChange={handleChange}
            />
            <FormPasswordInput
                label="Confirm Password"
                name="password2"
                value={formData.password2}
                handleChange={handleChange}
            />
            <label className="register-form-checkbox-label">
                <input
                    name="acceptRules"
                    type="checkbox"
                    className="register-form-checkbox"
                    onChange={handleChange}
                    checked={formData.acceptRules}
                />
                I agree with Terms of Service
            </label>
            <input
                type="submit"
                value="Create Account"
                className="register-form-submit"
            />
        </form>
    );
}
