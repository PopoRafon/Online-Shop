import { test, describe, expect, vi } from 'vitest';
import { render, getByTestId, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AccountDropdown from '@components/Navigation/Account/AccountDropdown';
import UserContextProvider from '@contexts/UserContext/UserContextProvider';
import AlertContextProvider from '@contexts/AlertContext/AlertContextProvider';

describe('account dropdown component', () => {
    test('account dropdown calls setShowDropdown function after mouse is clicked outside of account dropdown', () => {
        const mockSetShowDropdown = vi.fn();
        render(
            <BrowserRouter>
                <UserContextProvider>
                    <AlertContextProvider>
                        <AccountDropdown setShowDropdown={mockSetShowDropdown} accountButtonRef={{ current: null }} />
                    </AlertContextProvider>
                </UserContextProvider>
            </BrowserRouter>
        );

        expect(mockSetShowDropdown).not.toBeCalled();
        expect(getByTestId(document.body, 'account-dropdown')).toBeInTheDocument();
        fireEvent.click(document.body);
        expect(mockSetShowDropdown).toHaveBeenCalledOnce();
    });
});
