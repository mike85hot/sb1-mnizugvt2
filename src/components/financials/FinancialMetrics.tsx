import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FinancialMetricsProps {
  label: string;
  value: number;
  change: number;
  type?: 'currency' | 'percentage';
  currency?: string;
}

export const FinancialMetrics: React.FC<FinancialMetricsProps> = ({
  label,
  value,
  change,
  type = 'currency',
  currency = 'USD'
}) => {
  const formatValue = () => {
    if (type === 'percentage') {
      return `${value.toFixed(1)}%`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <h3 className="text-2xl font-semibold">{formatValue()}</h3>
        </div>
        <div className={`flex items-center ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm ml-1">
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </div>
  );
};