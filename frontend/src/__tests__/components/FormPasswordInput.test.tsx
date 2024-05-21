import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import FormPasswordInput from '@components/AuthForm/FormPasswordInput';

describe('form password input component', () => {
    const props = {
        label: 'Password',
        name: 'password',
        value: 'test password',
        handleChange: vi.fn(),
        error: ''
    };

    test('correctly renders component', () => {
        const { getByLabelText, getByRole } = render(<FormPasswordInput {...props} />);
        const input = getByLabelText(props.label);

        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(props.value);
        expect((getByLabelText(props.label) as HTMLInputElement).type).toEqual('password');
        expect(getByRole('button')).toBeInTheDocument();
    });

    test('calls handleChange function when gets input from keyboard', () => {
        const { getByLabelText } = render(<FormPasswordInput {...props} />);

        fireEvent.change(getByLabelText(props.label), { target: { value: 'new password' } });

        expect(props.handleChange).toHaveBeenCalledOnce();
    });

    test('changes input type when button is clicked', () => {
        const { getByLabelText, getByRole } = render(<FormPasswordInput {...props} />);

        fireEvent.click(getByRole('button'));

        expect((getByLabelText(props.label) as HTMLInputElement).type).toEqual('text');

        fireEvent.click(getByRole('button'));

        expect((getByLabelText(props.label) as HTMLInputElement).type).toEqual('password');
    });
});
