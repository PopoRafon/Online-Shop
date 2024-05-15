import type { ChangeEvent } from 'react';

type ProductInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
    error: string;
    type?: 'text' | 'number';
}

export default function ProductInput({ label, name, value, handleChange, error, type='text' }: ProductInputProps) {
    return (
        <label className="my-products-form-label">
            {label}
            <input
                name={name}
                type={type}
                className={`primary-border my-products-form-input ${error && 'my-products-form-input-error'}`}
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
            <span className="my-products-form-error-message">{error}</span>
        </label>
    );
}
