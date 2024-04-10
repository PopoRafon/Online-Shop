import type { ChangeEvent } from 'react';

type AddProductInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: string;
    type?: 'text' | 'number';
}

export default function AddProductInput({ label, name, value, handleChange, error, type='text' }: AddProductInputProps) {
    return (
        <label className="add-product-form-label">
            {label}
            <input
                name={name}
                type={type}
                className={`add-product-form-input ${error && 'add-product-form-input-error'}`}
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
            <span className="add-product-form-error-message">{error}</span>
        </label>
    );
}
