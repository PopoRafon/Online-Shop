import { test, describe, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Account from '@components/Navigation/Account';

describe('account component', () => {
    test('correctly renders account component', () => {
        const { getByAltText, getByRole, queryByTestId } = render(<Account />);

        expect(getByRole('button')).toBeInTheDocument();
        expect(getByAltText('Account icon')).toBeInTheDocument();
        expect(queryByTestId('account-dropdown')).not.toBeInTheDocument();
    });

    test('account button shows account dropdown after being clicked and hides it after being clicked one more time', () => {
        const { getByRole, getByTestId, queryByTestId } = render(
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        );
        const accountButton = getByRole('button') as HTMLButtonElement;

        fireEvent.click(accountButton);
        expect(getByTestId('account-dropdown')).toBeInTheDocument();
        fireEvent.click(accountButton);
        expect(queryByTestId('account-dropdown')).not.toBeInTheDocument();
    });
});
