import type { ChangeEvent } from 'react';

type FormInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: string;
    type?: 'text' | 'email';
}

export default function FormInput({ label, name, value, handleChange, error, type='text' }: FormInputProps) {
    return (
        <label className="auth-form-label">
            {label}
            <input
                name={name}
                type={type}
                className={`auth-form-input ${error && 'auth-form-input-error'}`}
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
            <span className="auth-form-error-message">{error}</span>
        </label>
    );
}
