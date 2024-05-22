import { test, describe, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SettingsForm from '@components/Settings/SettingsForm';
import AlertContextProvider from '@contexts/AlertContext/AlertContextProvider';
import UserContextProvider from '@contexts/UserContext/UserContextProvider';

const renderWithContexts = () => {
    return render(
        <BrowserRouter>
            <AlertContextProvider>
                <UserContextProvider>
                    <SettingsForm />
                </UserContextProvider>
            </AlertContextProvider>
        </BrowserRouter>
    );
};

describe('settings form component', () => {
    test('correctly renders form', () => {
        const { getByLabelText } = renderWithContexts();

        expect(getByLabelText('Username')).toBeInTheDocument();
        expect(getByLabelText('Email Address')).toBeInTheDocument();
        expect(getByLabelText('First Name')).toBeInTheDocument();
        expect(getByLabelText('Last Name')).toBeInTheDocument();
    });

    test('changes input value after it receives keyboard input', () => {
        const { getByLabelText } = renderWithContexts();
        const newValue: string = 'new value';

        fireEvent.change(getByLabelText('Username'), { target: { value: newValue } });

        expect(getByLabelText('Username')).toHaveValue(newValue);
    });

    test('fields are validated and errors are displayed after submitting form', () => {
        const { getByRole, getByText } = renderWithContexts();

        fireEvent.submit(getByRole('form'));

        expect(getByText('Must be valid email address.')).toBeInTheDocument();
        expect(getByText('Must not be shorter than 8 characters.')).toBeInTheDocument();
    });
});
