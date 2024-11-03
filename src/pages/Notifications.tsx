import React from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Button } from '../components/ui/Button';

const notifications = [
  {
    id: 1,
    title: 'New task assigned',
    message: 'John Doe assigned you to "Update landing page"',
    time: '5 minutes ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Task completed',
    message: 'Website redesign project has been marked as complete',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Team meeting',
    message: 'Daily standup meeting in 30 minutes',
    time: '2 hours ago',
    unread: false,
  },
];

export const Notifications: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <Button variant="ghost" size="sm">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border ${
              notification.unread
                ? 'border-blue-100 dark:border-blue-900'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  notification.unread
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                    {notification.time}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <Check className="h-4 w-4 text-green-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};