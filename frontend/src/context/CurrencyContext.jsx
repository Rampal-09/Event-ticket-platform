import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

// Supported currencies with symbol, name, and locale
export const CURRENCIES = {
    AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', locale: 'en-AU' },
    USD: { code: 'USD', symbol: '$',  name: 'US Dollar',          flag: '🇺🇸', locale: 'en-US' },
    INR: { code: 'INR', symbol: '₹',  name: 'Indian Rupee',        flag: '🇮🇳', locale: 'en-IN' },
    EUR: { code: 'EUR', symbol: '€',  name: 'Euro',                flag: '🇪🇺', locale: 'de-DE' },
    GBP: { code: 'GBP', symbol: '£',  name: 'British Pound',       flag: '🇬🇧', locale: 'en-GB' },
    SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar',    flag: '🇸🇬', locale: 'en-SG' },
    NZD: { code: 'NZD', symbol: 'NZ$',name: 'New Zealand Dollar',  flag: '🇳🇿', locale: 'en-NZ' },
    CAD: { code: 'CAD', symbol: 'CA$',name: 'Canadian Dollar',     flag: '🇨🇦', locale: 'en-CA' },
};

const DEFAULT_CURRENCY = CURRENCIES['AUD'];

const CurrencyContext = createContext({
    currency: DEFAULT_CURRENCY,
    formatPrice: (amount) => `A$${Number(amount).toFixed(2)}`,
    setCurrencyCode: () => {},
});

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

    useEffect(() => {
        // Fetch from backend on load
        api.get('/public/settings')
            .then(data => {
                const curr = CURRENCIES[data.currency] || DEFAULT_CURRENCY;
                setCurrency(curr);
            })
            .catch(() => {
                // Fall back to AUD silently
                setCurrency(DEFAULT_CURRENCY);
            });
    }, []);

    const setCurrencyCode = (code) => {
        const curr = CURRENCIES[code];
        if (curr) setCurrency(curr);
    };

    // Format a number as a price string in the current currency
    const formatPrice = (amount) => {
        const num = Number(amount) || 0;
        try {
            return new Intl.NumberFormat(currency.locale, {
                style: 'currency',
                currency: currency.code,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(num);
        } catch {
            return `${currency.symbol}${num.toFixed(2)}`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, formatPrice, setCurrencyCode }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyContext;
