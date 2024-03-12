import type { ChangeEvent } from 'react';

type FormInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    type?: 'text' | 'email';
}

export default function FormInput({ label, name, value, handleChange, type='text' }: FormInputProps) {
    return (
        <label className="register-form-label">
            {label}
            <input
                name={name}
                type={type}
                className="register-form-input"
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
        </label>
    );
}
