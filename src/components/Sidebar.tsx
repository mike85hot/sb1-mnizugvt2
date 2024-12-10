import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ClipboardList, 
  LineChart, 
  Receipt, 
  FileText, 
  Settings,
  BookOpen,
  Mail,
  Building2,
  Leaf
} from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: ClipboardList, label: 'Tasks', path: '/dashboard/tasks' },
    { icon: Leaf, label: 'ESG & Sustainability', path: '/dashboard/esg' },
    { icon: LineChart, label: 'Insights', path: '/dashboard/insights' },
    { icon: Receipt, label: 'Tax Filings', path: '/dashboard/tax-filings' },
    { icon: Mail, label: 'Investor Updates', path: '/dashboard/updates' },
    { icon: Building2, label: 'Company Data Room', path: '/dashboard/data-room' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <div className="mb-8 flex items-center">
        <BookOpen className="w-8 h-8 text-indigo-600" />
        <span className="ml-2 text-xl font-semibold">Tizora</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};