import React from 'react';
import { TaskList } from '../components/TaskList';
import { Task } from '../types';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Review sales tax filing',
    description: 'Please take a look at tizora.co/dashboard/tax-filings/1',
    status: 'todo',
    priority: 'high',
    assignee: {
      name: 'Roman Zubenko',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
    },
  },
  {
    id: '2',
    title: 'Grant Ben Stripe account access',
    description: 'LM to give ben@tizora.co access to Shopify as bookkeeper',
    status: 'in-progress',
    priority: 'low',
    assignee: {
      name: 'Roman Zubenko',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
    },
  },
  {
    id: '3',
    title: 'Upload incorporation docs',
    description: 'Delaware C-corp incorporation certificate, and any other documentation',
    status: 'todo',
    priority: 'high',
    assignee: {
      name: 'Roman Zubenko',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
    },
  },
];

const Tasks = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Filter tasks..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Tasks;