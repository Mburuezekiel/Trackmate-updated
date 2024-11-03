import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { List, Clock, Clipboard } from 'lucide-react';
import { useTaskStore } from '../store/taskStore'; // Ensure you import your task store

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const Analytics: React.FC = () => {
  const { tasks } = useTaskStore(); // Get tasks from the store

  // Calculate total tasks created, completed, and average completion time
  const totalTasksCreated = tasks.length;
  const totalTasksCompleted = tasks.filter(task => task.status === 'completed').length;
  const averageCompletionTime = tasks.reduce((total, task) => total + (task.completionTime || 0), 0) / totalTasksCreated || 0; // Assume task.completionTime is in hours

  // Line chart data
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Created',
        data: [8, 12, 5, 9, 15, 10, 7], // Placeholder; you may want to replace this with real data
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Tasks Completed',
        data: [5, 10, 3, 7, 12, 8, 9], // Placeholder; you may want to replace this with real data
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
  };

  // Doughnut chart data
  const doughnutChartData = {
    labels: ['Development', 'Marketing', 'Design', 'Sales', 'Support'],
    datasets: [
      {
        data: [30, 15, 25, 10, 20], // Placeholder; you may want to replace this with real data
        backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981'],
        hoverBackgroundColor: ['#2563eb', '#d97706', '#7c3aed', '#dc2626', '#059669'],
      },
    ],
  };

  return (
    <div className="h-full space-y-6 p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Statistics summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center bg-gray-800 p-6 rounded-lg">
          <List className="text-blue-500 w-8 h-8 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Total Tasks Created</h3>
            <p className="text-3xl font-bold">{totalTasksCreated}</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-800 p-6 rounded-lg">
          <Clock className="text-yellow-500 w-8 h-8 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Avg. Completion Time</h3>
            <p className="text-3xl font-bold">{averageCompletionTime.toFixed(2)}h</p> {/* Show average in hours */}
          </div>
        </div>
        <div className="flex items-center bg-gray-800 p-6 rounded-lg">
          <Clipboard className="text-green-500 w-8 h-8 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Tasks Completed</h3>
            <p className="text-3xl font-bold">{totalTasksCompleted}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line chart for tasks created vs. completed */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Weekly Task Trends</h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        {/* Doughnut chart for task categories */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Tasks by Category</h3>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>
    </div>
  );
};
