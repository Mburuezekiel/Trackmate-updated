import React from 'react';
import { NavLink } from 'react-router-dom';
import taskflowLogo from '../../assets/Taskflow .jpg'; // Ensure no spaces in the filename
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  PieChart,
  CheckSquare,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: CheckSquare, label: 'Tasks', to: '/tasks' },
  { icon: Calendar, label: 'Calendar', to: '/calendar' },
  { icon: Users, label: 'Team', to: '/team' },
  { icon: PieChart, label: 'Analytics', to: '/analytics' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-8 px-4 flex items-center">
          <img
            src={taskflowLogo} 
            alt="TaskMate Logo" 
            className="h-12 w-12 rounded-full shadow-md mr-2" // Adjust size as needed
          />
          <h1 className="text-2xl font-bold text-white">TrackMate</h1>
        </div>
        <p className="text-gray-400 mb-4">Streamline your workflow, boost productivity</p>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};
