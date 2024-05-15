import type { ChangeEvent } from 'react';

type ProductSelectProps = {
    value: string;
    error: string;
    handleChange(event: ChangeEvent<HTMLSelectElement>): void;
}

export default function ProductCategory({ value, error, handleChange }: ProductSelectProps) {
    return (
        <label className="my-products-form-label" style={{ width: 'fit-content' }}>
            <select
                name="category"
                value={value}
                className={`primary-border my-products-form-select ${error && 'my-products-form-input-error'}`}
                onChange={handleChange}
            >
                <option value="" hidden>Category...</option>
                <option value="electronics">Electronics</option>
                <option value="children">Children</option>
                <option value="art">Art</option>
                <option value="health">Health</option>
                <option value="entertainment">Entertainment</option>
                <option value="automotive">Automotive</option>
            </select>
            <span className="my-products-form-error-message">{error}</span>
        </label>
    );
}
