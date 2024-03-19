import type { ChangeEvent } from 'react';
import { useState } from 'react';
import ShowIcon from '@assets/images/icons/show_icon.svg';
import HideIcon from '@assets/images/icons/hide_icon.svg';

type FormPasswordInputProps = {
    label: string;
    name: string;
    value: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

export default function FormPasswordInput({ label, name, value, handleChange, error }: FormPasswordInputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <label className="auth-form-label">
            {label}
            <input
                name={name}
                type={showPassword ? 'text' : 'password'}
                className={`auth-form-input ${error && 'auth-form-input-error'}`}
                value={value}
                onChange={handleChange}
                autoComplete="off"
                style={{ paddingRight: '40px' }}
            />
            <span className="auth-form-error-message">{error}</span>
            <button
                type="button"
                className="auth-form-input-show-button"
                onClick={() => setShowPassword(prev => !prev)}
            >
                {showPassword ? (
                    <img
                        height={30}
                        width={30}
                        src={HideIcon}
                        alt="Hide password"
                    />
                ) : (
                    <img
                        height={30}
                        width={30}
                        src={ShowIcon}
                        alt="Show password"
                    />
                )}
            </button>
        </label>
    );
}
