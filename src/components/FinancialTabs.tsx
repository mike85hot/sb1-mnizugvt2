import React, { useState } from 'react';

interface FinancialTabsProps {
  children: React.ReactNode[];
  labels: string[];
}

export const FinancialTabs: React.FC<FinancialTabsProps> = ({ children, labels }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-12">
          {labels.map((label, index) => (
            <button
              key={label}
              onClick={() => setActiveTab(index)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                ${activeTab === index
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-300'
                }
              `}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="transition-all duration-300 ease-in-out">
        {children[activeTab]}
      </div>
    </div>
  );
};