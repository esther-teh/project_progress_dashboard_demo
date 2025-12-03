import { Play, Pause, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';
import { TimeChart } from './time-chart';

interface TimeEntry {
  id: string;
  projectName: string;
  taskName: string;
  duration: number; // in minutes
  date: string;
  status: 'running' | 'stopped';
}

interface TimeTrackingViewProps {
  projects: any[];
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    projectName: 'Website Redesign',
    taskName: 'Homepage wireframes',
    duration: 145,
    date: '2025-12-03',
    status: 'stopped'
  },
  {
    id: '2',
    projectName: 'Mobile App Development',
    taskName: 'API integration',
    duration: 230,
    date: '2025-12-03',
    status: 'stopped'
  },
  {
    id: '3',
    projectName: 'Website Redesign',
    taskName: 'Component development',
    duration: 180,
    date: '2025-12-02',
    status: 'stopped'
  },
  {
    id: '4',
    projectName: 'Marketing Campaign Q4',
    taskName: 'Social media content',
    duration: 90,
    date: '2025-12-02',
    status: 'stopped'
  },
  {
    id: '5',
    projectName: 'Backend Infrastructure',
    taskName: 'Database optimization',
    duration: 195,
    date: '2025-12-01',
    status: 'stopped'
  },
];

export function TimeTrackingView({ projects }: TimeTrackingViewProps) {
  const [timeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const totalTimeToday = timeEntries
    .filter(entry => entry.date === '2025-12-03')
    .reduce((sum, entry) => sum + entry.duration, 0);

  const totalTimeWeek = timeEntries.reduce((sum, entry) => sum + entry.duration, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Time Tracking</h1>
        <p className="text-gray-600">Track and manage time spent on your projects</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-600">Today</span>
          </div>
          <p className="text-gray-900">{formatDuration(totalTimeToday)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-gray-600">This Week</span>
          </div>
          <p className="text-gray-900">{formatDuration(totalTimeWeek)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Play className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-gray-600">Active Tasks</span>
          </div>
          <p className="text-gray-900">{activeTimer ? '1' : '0'}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-gray-600">Avg per Day</span>
          </div>
          <p className="text-gray-900">{formatDuration(Math.round(totalTimeWeek / 3))}</p>
        </div>
      </div>

      {/* Time Chart */}
      <TimeChart timeEntries={timeEntries} projects={projects} />

      {/* Quick Timer */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Quick Timer</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            Start Timer
          </button>
        </div>
      </div>

      {/* Recent Time Entries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Recent Time Entries</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {timeEntries.map(entry => (
            <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-gray-900">{entry.taskName}</h4>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {entry.projectName}
                    </span>
                  </div>
                  <p className="text-gray-500">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-900">{formatDuration(entry.duration)}</span>
                  <button
                    onClick={() => setActiveTimer(activeTimer === entry.id ? null : entry.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {activeTimer === entry.id ? (
                      <Pause className="w-5 h-5 text-orange-600" />
                    ) : (
                      <Play className="w-5 h-5 text-blue-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
