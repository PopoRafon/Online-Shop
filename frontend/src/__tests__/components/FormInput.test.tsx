import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import FormInput from '@components/AuthForm/FormInput';

describe('form input component', () => {
    const props = {
        label: 'Username',
        name: 'username',
        value: 'user',
        handleChange: vi.fn(),
        error: ''
    };

    test('correctly renders component', () => {
        const { getByLabelText } = render(<FormInput {...props} />);
        const input = getByLabelText(props.label);

        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(props.value);
    });

    test('calls handleChange function when gets input from keyboard', () => {
        const { getByLabelText } = render(<FormInput {...props} />);

        fireEvent.change(getByLabelText(props.label), { target: { value: 'new user' } });

        expect(props.handleChange).toHaveBeenCalledOnce();
    });
});
