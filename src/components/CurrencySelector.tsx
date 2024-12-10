import React from 'react';
import { AFRICAN_CURRENCIES, CurrencyCode } from '../utils/currency';

interface CurrencySelectorProps {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as CurrencyCode)}
      className={`appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    >
      {Object.entries(AFRICAN_CURRENCIES).map(([code, { name, symbol }]) => (
        <option key={code} value={code}>
          {symbol} {code} - {name}
        </option>
      ))}
    </select>
  );
};