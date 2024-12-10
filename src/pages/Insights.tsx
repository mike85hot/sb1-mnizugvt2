import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { format } from 'date-fns';

const salesData = [
  { month: '2024-01', value: 24350 },
  { month: '2024-02', value: 28300 },
  { month: '2024-03', value: 21350 },
  { month: '2024-04', value: 25750 },
  { month: '2024-05', value: 31645 },
  { month: '2024-06', value: 27500 },
  { month: '2024-07', value: 25750 },
  { month: '2024-08', value: 29000 },
];

const costBreakdown = [
  { name: 'COGS', percentage: 40 },
  { name: 'Marketing', percentage: 15 },
  { name: 'Admin', percentage: 10 },
  { name: 'Shipping', percentage: 3 },
];

const Insights = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Profitability insights
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total sales', value: 19910, change: 12 },
            { label: 'Marketing costs', value: 573, change: -22 },
            { label: 'COGS', value: 5177, change: 16 },
            { label: 'Operating costs', value: 3875, change: -22 },
            { label: 'Taxes', value: 1820, change: 2 },
            { label: 'Net profit', value: 8468, change: 15 },
          ].map((metric) => (
            <div key={metric.label} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-semibold">${metric.value}</span>
                <span className={`text-sm ${
                  metric.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Sales</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tickFormatter={(value) => format(new Date(value), 'MMM')}
                  />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Costs breakdown</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costBreakdown}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit="%" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;