import React from 'react';
import { Download, Share2, Calendar } from 'lucide-react';
import { CurrencySelector } from '../CurrencySelector';
import { CurrencyCode } from '../../utils/currency';

interface FinancialHeaderProps {
  title: string;
  onExport: () => void;
  onShare: () => void;
  onPeriodChange: (period: string) => void;
  currentPeriod: string;
  selectedCurrency?: CurrencyCode;
  onCurrencyChange?: (currency: CurrencyCode) => void;
}

export const FinancialHeader: React.FC<FinancialHeaderProps> = ({
  title,
  onExport,
  onShare,
  onPeriodChange,
  currentPeriod,
  selectedCurrency,
  onCurrencyChange
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center space-x-4">
        {selectedCurrency && onCurrencyChange && (
          <CurrencySelector
            value={selectedCurrency}
            onChange={onCurrencyChange}
          />
        )}
        <select
          value={currentPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
        <button
          onClick={onExport}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
        >
          <Download className="w-5 h-5" />
        </button>
        <button
          onClick={onShare}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};