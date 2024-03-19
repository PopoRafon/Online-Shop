import { test, describe, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import SearchBar from '@components/Navigation/SearchBar';

describe('searchbar component', () => {
    test('correctly renders searchbar component', () => {
        const { getByPlaceholderText, getByRole } = render(<SearchBar />);
        const searchBoxInput = getByPlaceholderText('What are you looking for?') as HTMLInputElement;

        expect(getByRole('form')).toBeInTheDocument();
        expect(searchBoxInput).toBeInTheDocument();
        expect(searchBoxInput.value).toBe('');
        expect(searchBoxInput).toHaveAttribute('name', 'search');
        expect(searchBoxInput).toHaveAttribute('type', 'text');
    });

    test('search input adds outline to form when focused and removes it when blured', () => {
        const { getByPlaceholderText, getByRole } = render(<SearchBar />);
        const form = getByRole('form') as HTMLFormElement;
        const searchBoxInput = getByPlaceholderText('What are you looking for?') as HTMLInputElement;

        expect(form.style.outline).toBe('');
        fireEvent.focus(searchBoxInput);
        expect(form.style.outline).toBe('2px solid rgb(105, 165, 255)');
        fireEvent.blur(searchBoxInput);
        expect(form.style.outline).toBe('');
    });
});
