import { expect, test, describe, vi } from 'vitest';
import Currency from '@helpers/currency';

describe('currency helper', () => {
    test('initCurrency method calls setUser function and sets new currency in localStorage', () => {
        const setUserMock = vi.fn();

        Currency.initCurrency(setUserMock);

        const currency = localStorage.getItem('currency');

        expect(currency).not.toBeNull();
        expect(Currency.getCurrencyTypes()).toContain(currency);
        expect(setUserMock).toHaveBeenCalledOnce();
    });

    test('changeCurrency method calls setUser function with new currency type', () => {
        const setUserMock = vi.fn();

        Currency.changeCurrency(setUserMock, Currency.getCurrencyTypes()[0]);

        expect(setUserMock).toHaveBeenCalled();
    });
});
