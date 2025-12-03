import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import { DashboardView } from './components/dashboard-view';
import { TimeTrackingView } from './components/time-tracking-view';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  dueDate: string;
  tasksCompleted: number;
  totalTasks: number;
  team: string[];
  estimatedHours: number;
  hoursLogged: number;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern UI/UX',
    progress: 75,
    status: 'on-track',
    dueDate: '2025-12-15',
    tasksCompleted: 45,
    totalTasks: 60,
    team: ['Alice', 'Bob', 'Carol'],
    estimatedHours: 120,
    hoursLogged: 87
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native iOS and Android app for customer engagement',
    progress: 45,
    status: 'at-risk',
    dueDate: '2025-12-28',
    tasksCompleted: 27,
    totalTasks: 60,
    team: ['David', 'Emma', 'Frank'],
    estimatedHours: 200,
    hoursLogged: 92
  },
  {
    id: '3',
    name: 'Marketing Campaign Q4',
    description: 'Holiday season marketing initiatives across all channels',
    progress: 90,
    status: 'on-track',
    dueDate: '2025-12-10',
    tasksCompleted: 36,
    totalTasks: 40,
    team: ['Grace', 'Henry'],
    estimatedHours: 80,
    hoursLogged: 68
  },
  {
    id: '4',
    name: 'Backend Infrastructure',
    description: 'Server migration and optimization for improved performance',
    progress: 30,
    status: 'delayed',
    dueDate: '2025-12-20',
    tasksCompleted: 12,
    totalTasks: 40,
    team: ['Ian', 'Julia', 'Kevin', 'Laura'],
    estimatedHours: 160,
    hoursLogged: 45
  }
];

export default function App() {
  const [projects] = useState<Project[]>(mockProjects);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView projects={projects} />;
      case 'projects':
        return <DashboardView projects={projects} />;
      case 'time-tracking':
        return <TimeTrackingView projects={projects} />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-gray-900">Analytics</h1>
            <p className="text-gray-600">Analytics view coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-gray-900">Settings</h1>
            <p className="text-gray-600">Settings view coming soon...</p>
          </div>
        );
      default:
        return <DashboardView projects={projects} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
