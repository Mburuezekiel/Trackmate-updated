import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { Button } from '../components/ui/Button';
import { NewTaskModal } from '../components/Tasks/NewTaskModal';

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1)); // November 1st, 2024
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="h-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <h2 className="text-xl text-gray-900 dark:text-white font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
        <Button onClick={() => setIsNewTaskModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 h-[calc(100vh-300px)]">
          {days.map((day) => {
            const dayTasks = getTasksForDate(day);
            return (
              <div
                key={day.toString()}
                className={`border-b border-r border-gray-200 dark:border-gray-700 p-2 ${
                  !isSameMonth(day, currentDate)
                    ? 'bg-gray-50 dark:bg-gray-900'
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                      isToday(day)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs p-1 rounded truncate ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
      />
    </div>
  );
};