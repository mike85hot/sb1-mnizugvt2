import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MetricCard } from '../components/MetricCard';
import { TaskList } from '../components/TaskList';
import { FinancialStatement } from '../components/FinancialStatement';
import { FinancialTabs } from '../components/FinancialTabs';
import { FinancialMetric, Task } from '../types';

const financialData = {
  Income: {
    Sales: {
      'August 2024': 7680.00,
      'September 2024': 10200.00,
      'October 2024': 12880.00
    },
    'Total Income': {
      'August 2024': 7680.00,
      'September 2024': 10200.00,
      'October 2024': 12880.00
    }
  },
  'Cost of Goods Sold': {
    'Channel Selling Fees': {
      'August 2024': 0.00,
      'September 2024': 12.54,
      'October 2024': 0.00
    },
    'Cost of Goods Sold': {
      'August 2024': 0.00,
      'September 2024': 0.00,
      'October 2024': 0.00
    },
    'Supplies/Materials COGS': {
      'August 2024': 0.00,
      'September 2024': 404.81,
      'October 2024': 499.97
    }
  },
  'Operating Expenses': {
    'Contract Labor': {
      'August 2024': 135.00,
      'September 2024': 0.00,
      'October 2024': 16125.00
    },
    'Employee Benefits': {
      'August 2024': 0.00,
      'September 2024': 0.00,
      'October 2024': 54.36
    },
    'General Business Expenses': {
      'August 2024': 0.00,
      'September 2024': -0.01,
      'October 2024': 1670.00
    },
    'Legal & Accounting Services': {
      'August 2024': 27.00,
      'September 2024': 63.00,
      'October 2024': 0.00
    },
    'Office Expenses': {
      'August 2024': 327.50,
      'September 2024': 416.98,
      'October 2024': 1976.79
    },
    'Payroll Expenses': {
      'August 2024': 17406.24,
      'September 2024': 0.00,
      'October 2024': 34479.90
    },
    'Rent': {
      'August 2024': 154.87,
      'September 2024': 4503.07,
      'October 2024': 4192.50
    },
    'Taxes Paid': {
      'August 2024': 12409.42,
      'September 2024': 0.00,
      'October 2024': 22480.70
    },
    'Travel': {
      'August 2024': 2.90,
      'September 2024': 1363.38,
      'October 2024': 780.68
    }
  },
  'Totals': {
    'Net Operating Income': {
      'August 2024': -30691.50,
      'September 2024': -7856.70,
      'October 2024': -83329.60
    },
    'Net Income': {
      'August 2024': -30691.50,
      'September 2024': -7856.70,
      'October 2024': -83329.60
    }
  }
};
const metrics: FinancialMetric[] = [
  { label: 'Cash', value: 1520686, change: 12 },
  { label: 'Monthly Burn', value: 85450, change: -22 },
  { label: 'Runway', value: 17, change: 5 },
  { label: 'MRR', value: 12880, change: 15 },
];

const tasks: Task[] = [
  {
    id: '1',
    title: 'Review sales tax filing',
    description: 'Please take a look at afternoon.co/dashboard/tax-filings/1',
    status: 'todo',
    priority: 'high',
    assignee: {
      name: 'Roman Zubenko',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
    },
  },
  // Add more sample tasks as needed
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const userName = currentUser?.displayName || 'there';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Good afternoon, {userName}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <FinancialTabs labels={['Income Statement', 'Balance Sheet']}>
            <FinancialStatement
              type="income"
              data={financialData}
              periods={['August 2024', 'September 2024', 'October 2024']}
            />
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-500 text-center">Balance sheet coming soon...</p>
            </div>
          </FinancialTabs>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;