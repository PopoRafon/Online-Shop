import type { ChangeEvent } from 'react';

type ProductDescriptionProps = {
    value: string;
    error: string;
    handleChange(event: ChangeEvent<HTMLTextAreaElement>): void;
}

export default function ProductDescription({ value, error, handleChange }: ProductDescriptionProps) {
    return (
        <label className="my-products-form-label">
            Description
            <textarea
                name="description"
                className={`primary-border my-products-form-input ${error && 'my-products-form-input-error'}`}
                value={value}
                style={{ resize: 'none' }}
                onChange={handleChange}
                rows={8}
                autoComplete="off"
            />
            <span className="my-products-form-error-message">{error}</span>
        </label>
    );
}
