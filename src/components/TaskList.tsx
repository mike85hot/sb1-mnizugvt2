import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

const TaskStatusIcon = ({ status }: { status: Task['status'] }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="w-5 h-5 text-blue-500" />;
    default:
      return <Circle className="w-5 h-5 text-gray-400" />;
  }
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            + Add
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start gap-4">
              <TaskStatusIcon status={task.status} />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {task.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-700'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
                <img
                  src={task.assignee.avatar}
                  alt={task.assignee.name}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};