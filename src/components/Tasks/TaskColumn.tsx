import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task } from '../../types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-800 rounded-lg p-4"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};