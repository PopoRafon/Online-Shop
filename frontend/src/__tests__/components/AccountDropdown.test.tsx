import { test, describe, expect, vi } from 'vitest';
import { render, getByTestId, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AccountDropdown from '@components/Navigation/Account/AccountDropdown';
import UserContextProvider from '@contexts/UserContext/UserContextProvider';
import AlertContextProvider from '@contexts/AlertContext/AlertContextProvider';

describe('account dropdown component', () => {
    test('account dropdown calls setShowDropdown function after mouse is clicked outside of account dropdown', () => {
        const setShowDropdownMock = vi.fn();
        render(
            <BrowserRouter>
                <UserContextProvider>
                    <AlertContextProvider>
                        <AccountDropdown setShowDropdown={setShowDropdownMock} accountButtonRef={{ current: null }} />
                    </AlertContextProvider>
                </UserContextProvider>
            </BrowserRouter>
        );

        expect(setShowDropdownMock).not.toBeCalled();
        expect(getByTestId(document.body, 'account-dropdown')).toBeInTheDocument();
        fireEvent.click(document.body);
        expect(setShowDropdownMock).toHaveBeenCalledOnce();
    });
});
