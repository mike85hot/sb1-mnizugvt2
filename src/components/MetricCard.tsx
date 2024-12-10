import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { FinancialMetric } from '../types';

interface MetricCardProps {
  metric: FinancialMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const isPositive = metric.change >= 0;
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
          <h3 className="text-2xl font-semibold">
            ${metric.value.toLocaleString()}
          </h3>
        </div>
        <div className={`flex items-center ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          <span className="text-sm ml-1">
            {Math.abs(metric.change)}%
          </span>
        </div>
      </div>
    </div>
  );
};