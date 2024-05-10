type CurrencyType = {
    readonly symbol: string;
    readonly multiplier: number;
}

type CurrencyTypes = {
    readonly [key: string]: CurrencyType;
}

export default class Currency {
    private static initialCurrencyType: string = 'USD';
    public static readonly currencyTypes: CurrencyTypes = {
        USD: {
            symbol: '$',
            multiplier: 1
        },
        EUR: {
            symbol: '€',
            multiplier: 1.2
        },
        GBP: {
            symbol: '£',
            multiplier: 1.2
        }
    };

    static convertCurrency(price: number): number {
        const currency: string = localStorage.getItem('currency') ?? this.initialCurrencyType;

        return price * this.currencyTypes[currency].multiplier;
    }

    static initCurrency(): void {
        const currency: string | null = localStorage.getItem('currency');

        if (!currency || !(currency in this.currencyTypes)) {
            localStorage.setItem('currency', this.initialCurrencyType);
        }
    }
}
