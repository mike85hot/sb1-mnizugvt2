import { useState, useEffect } from 'react';

export const AFRICAN_CURRENCIES = {
  NGN: { name: 'Nigerian Naira', symbol: '₦' },
  KES: { name: 'Kenyan Shilling', symbol: 'KSh' },
  ZAR: { name: 'South African Rand', symbol: 'R' },
  EGP: { name: 'Egyptian Pound', symbol: 'E£' },
  GHS: { name: 'Ghanaian Cedi', symbol: 'GH₵' },
  UGX: { name: 'Ugandan Shilling', symbol: 'USh' },
  TZS: { name: 'Tanzanian Shilling', symbol: 'TSh' },
  RWF: { name: 'Rwandan Franc', symbol: 'FRw' },
  USD: { name: 'US Dollar', symbol: '$' }
} as const;

export type CurrencyCode = keyof typeof AFRICAN_CURRENCIES;

interface ExchangeRates {
  [key: string]: number;
}

// This would typically come from an API
const MOCK_EXCHANGE_RATES: ExchangeRates = {
  NGN: 1550.00,
  KES: 156.50,
  ZAR: 18.75,
  EGP: 30.90,
  GHS: 12.45,
  UGX: 3800.00,
  TZS: 2520.00,
  RWF: 1230.00,
  USD: 1.00
};

export const convertCurrency = (
  amount: number,
  from: CurrencyCode = 'USD',
  to: CurrencyCode = 'USD'
): number => {
  if (from === to) return amount;
  const fromRate = MOCK_EXCHANGE_RATES[from];
  const toRate = MOCK_EXCHANGE_RATES[to];
  return (amount / fromRate) * toRate;
};

export const formatCurrency = (
  amount: number,
  currency: CurrencyCode = 'USD',
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
};

export const useCurrencyConverter = (defaultCurrency: CurrencyCode = 'USD') => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(defaultCurrency);
  const [rates, setRates] = useState<ExchangeRates>(MOCK_EXCHANGE_RATES);

  useEffect(() => {
    // In production, fetch real exchange rates from an API
    // For now, we'll use mock data
    setRates(MOCK_EXCHANGE_RATES);
  }, []);

  const convert = (amount: number, from: CurrencyCode = 'USD') => {
    return convertCurrency(amount, from, selectedCurrency);
  };

  const format = (amount: number, options?: Intl.NumberFormatOptions) => {
    return formatCurrency(amount, selectedCurrency, options);
  };

  return {
    selectedCurrency,
    setSelectedCurrency,
    convert,
    format,
    rates,
    currencies: AFRICAN_CURRENCIES
  };
};