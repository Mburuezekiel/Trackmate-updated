import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Dashboard: React.FC = () => {
  const { tasks } = useTaskStore();

  // Calculate task stats dynamically
  const tasksDueToday = tasks.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString()).length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'todo' || task.status === 'in_progress').length;
  const teamMembers = 3; // If this is dynamic, replace it with the actual count

  const dynamicStats = [
    {
      title: 'Tasks Due Today',
      value: tasksDueToday.toString(),
      icon: Clock,
      color: 'bg-blue-500',
    },
    {
      title: 'Team Members',
      value: teamMembers.toString(),
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks.toString(),
      icon: CheckCircle,
      color: 'bg-purple-500',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks.toString(),
      icon: AlertCircle,
      color: 'bg-yellow-500',
    },
  ];

  // Sample chart data; you can customize this with real data over time if available
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 15, 25, 22, 30, 28], // Replace this with actual completed tasks data if available
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Weekly Task Completion' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicStats.map((stat) => (
          <div key={stat.title} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <Line data={chartData} options={options} />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
  <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
  <div className="space-y-3">
    <div className="flex items-center space-x-3">
      <div className="bg-blue-500 p-2 rounded-full">
        <i className="text-white bi bi-box-arrow-in-right"></i> {/* Logged in icon */}
      </div>
      <div>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Logged in</span>
        </p>
        <p className="text-xs text-gray-400">2 minutes ago</p>
      </div>
    </div>

    <div className="flex items-center space-x-3">
      <div className="bg-green-500 p-2 rounded-full">
        <i className="text-white bi bi-plus-circle"></i> {/* Added task icon */}
      </div>
      <div>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Added a new task</span> - Design the dashboard UI
        </p>
        <p className="text-xs text-gray-400">10 minutes ago</p>
      </div>
    </div>

    <div className="flex items-center space-x-3">
      <div className="bg-yellow-500 p-2 rounded-full">
        <i className="text-white bi bi-check-circle"></i> {/* Completed task icon */}
      </div>
      <div>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Completed a task</span> - Research competitor analysis
        </p>
        <p className="text-xs text-gray-400">30 minutes ago</p>
      </div>
    </div>

    <div className="flex items-center space-x-3">
      <div className="bg-purple-500 p-2 rounded-full">
        <i className="text-white bi bi-pencil-square"></i> {/* Edited task icon */}
      </div>
      <div>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Edited a task</span> - Updated project requirements
        </p>
        <p className="text-xs text-gray-400">1 hour ago</p>
      </div>
    </div>

    <div className="flex items-center space-x-3">
      <div className="bg-red-500 p-2 rounded-full">
        <i className="text-white bi bi-trash"></i> {/* Deleted task icon */}
      </div>
      <div>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Deleted a task</span> - Remove outdated marketing materials
        </p>
        <p className="text-xs text-gray-400">2 hours ago</p>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};
