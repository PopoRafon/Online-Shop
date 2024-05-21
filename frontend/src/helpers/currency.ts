import type { User } from '@contexts/UserContext/UserContextProvider';

export type CurrencyType = {
    readonly symbol: string;
    readonly multiplier: number;
}

type CurrencyTypes = {
    readonly [key: string]: CurrencyType;
}

export default class Currency {
    private static initialCurrencyType: string = 'USD';
    private static readonly currencyTypes: CurrencyTypes = {
        USD: {
            symbol: '$',
            multiplier: 1
        },
        EUR: {
            symbol: '€',
            multiplier: 1.08
        },
        GBP: {
            symbol: '£',
            multiplier: 1.25
        }
    };

    static changeCurrency(setUser: React.Dispatch<React.SetStateAction<User>>, currencyType: string): void {
        const newCurrency: CurrencyType = this.currencyTypes[currencyType];

        if (!newCurrency) {
            throw new Error('Provided currency type doesn\'t exist.');
        }

        setUser(prev => ({ ...prev, currency: newCurrency }));
    }

    static getCurrencyTypes(): string[] {
        return Object.keys(Currency.currencyTypes);
    }

    static initCurrency(setUser: React.Dispatch<React.SetStateAction<User>>): void {
        let currency: string | null = localStorage.getItem('currency');

        if (!currency || !(currency in this.currencyTypes)) {
            localStorage.setItem('currency', this.initialCurrencyType);
            currency = this.initialCurrencyType;
        }

        setUser(prev => ({
            ...prev,
            currency: this.currencyTypes[currency as string]
        }));
    }
}
