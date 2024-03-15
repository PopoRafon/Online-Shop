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
        <label className="register-form-label">
            {label}
            <input
                name={name}
                type={type}
                className={`register-form-input ${error && 'register-form-input-error'}`}
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
            <span className="register-form-error-message">{error}</span>
        </label>
    );
}
