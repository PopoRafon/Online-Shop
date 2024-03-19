import { test, describe, expect, vi } from 'vitest';
import { render, getByTestId, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AccountDropdown from '@components/Navigation/AccountDropdown';

describe('account dropdown component', () => {
    test('account dropdown calls setShowDropdown function after mouse is clicked outside of account dropdown', () => {
        const mockSetShowDropdown = vi.fn();
        render(
            <BrowserRouter>
                <AccountDropdown setShowDropdown={mockSetShowDropdown} accountButtonRef={{ current: null }} />
            </BrowserRouter>
        );

        expect(mockSetShowDropdown).not.toBeCalled();
        expect(getByTestId(document.body, 'account-dropdown')).toBeInTheDocument();
        fireEvent.mouseDown(document.body);
        expect(mockSetShowDropdown).toHaveBeenCalledOnce();
    });
});
