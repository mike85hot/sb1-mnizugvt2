import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FinancialHeader } from './financials/FinancialHeader';
import { FinancialMetrics } from './financials/FinancialMetrics';

interface FinancialData {
  [key: string]: {
    [key: string]: {
      [key: string]: number;
    };
  };
}

interface FinancialStatementProps {
  data: FinancialData;
  periods: string[];
  type: 'income' | 'balance';
}

export const FinancialStatement: React.FC<FinancialStatementProps> = ({
  data,
  periods,
  type
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['Income', 'Cost of Goods Sold', 'Operating Expenses', 'Totals']);
  const [currentPeriod, setCurrentPeriod] = useState('month');

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <FinancialHeader
        title={type === 'income' ? 'Income Statement' : 'Balance Sheet'}
        onExport={() => {
          const element = document.createElement('a');
          element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent('Financial Data CSV'));
          element.setAttribute('download', `${type}-statement-${new Date().toISOString().split('T')[0]}.csv`);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }}
        onShare={() => console.log('Sharing...')}
        onPeriodChange={setCurrentPeriod}
        currentPeriod={currentPeriod}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <FinancialMetrics
          label="Gross Profit"
          value={25000}
          change={12}
        />
        <FinancialMetrics
          label="Operating Margin"
          value={15.4}
          change={-2.1}
          type="percentage"
        />
        <FinancialMetrics
          label="Net Income"
          value={18500}
          change={8.5}
        />
        <FinancialMetrics
          label="Cash Flow"
          value={95000}
          change={5.2}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate" style={{ borderSpacing: '0 8px' }}>
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-gray-400 py-2 w-1/3"></th>
              {periods.map(period => (
                <th key={period} className="text-right text-sm font-medium text-gray-400 py-2 px-6">
                  {period}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([section, items]) => (
              <React.Fragment key={section}>
                <tr 
                  className="cursor-pointer transition-all duration-200 hover:bg-gray-50"
                  onClick={() => toggleSection(section)}
                >
                  <td className="py-4 px-4 rounded-l-lg flex items-center font-medium text-gray-900">
                    {expandedSections.includes(section) ? (
                      <ChevronDown className="w-4 h-4 mr-3 text-gray-400" />
                    ) : (
                      <ChevronUp className="w-4 h-4 mr-3 text-gray-400" />
                    )}
                    {section}
                  </td>
                  {periods.map(period => (
                    <td 
                      key={`${section}-${period}-total`} 
                      className={`text-right py-4 px-6 font-medium ${
                        section === 'Totals' ? 'text-gray-900' : 'text-gray-600'
                      } ${period === periods[periods.length - 1] ? 'rounded-r-lg' : ''}`}
                    >
                      ${Object.values(items).reduce((sum, val) => sum + (val[period] || 0), 0).toLocaleString()}
                    </td>
                  ))}
                </tr>
                {expandedSections.includes(section) &&
                  Object.entries(items).map(([item, values]) => (
                    <tr key={`${section}-${item}`} className="text-sm hover:bg-gray-50">
                      <td className="py-3 pl-12 text-gray-600">{item}</td>
                      {periods.map(period => (
                        <td key={`${section}-${item}-${period}`} className="text-right py-3 px-6 text-gray-600">
                          ${values[period]?.toLocaleString() || '0'}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};