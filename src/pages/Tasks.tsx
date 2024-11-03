import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { TaskColumn } from '../components/Tasks/TaskColumn';
import { TaskFilters } from '../components/Tasks/TaskFilters';
import { useTaskStore } from '../store/taskStore';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { Task } from '../types';
import { Button } from '../components/ui/Button';
import { NewTaskModal } from '../components/Tasks/NewTaskModal';
export const Tasks: React.FC = () => {
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { tasks, moveTask } = useTaskStore();

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
    { id: 'blocked', title: 'Blocked' },
  ];
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      moveTask(active.id.toString(), over.id.toString() as Task['status']);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="h-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <Button onClick={() => setIsNewTaskModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </Button>
        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          New Task
        </button> */}
      </div>

      <TaskFilters
        priority={filterPriority}
        onPriorityChange={setFilterPriority}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={filteredTasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </DndContext>
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
      />
    </div>
  );
};