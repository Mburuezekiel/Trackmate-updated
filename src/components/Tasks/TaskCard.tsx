import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Clock, MessageSquare, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
  } : undefined;

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-white font-medium">{task.title}</h4>
        <span className={`px-2 py-1 rounded text-xs ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between text-gray-400 text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{format(new Date(task.dueDate), 'MMM d')}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>{task.comments.length}</span>
          </div>
          <div className="flex items-center">
            <Paperclip className="w-4 h-4 mr-1" />
            <span>{task.attachments.length}</span>
          </div>
        </div>

        <div className="flex -space-x-2">
          {task.assignedTo.map((user) => (
            <img
              key={user.id}
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 rounded-full border-2 border-gray-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
};