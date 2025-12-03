import { useState } from 'react';
import { StatsCard } from './stats-card';
import { ProjectCard } from './project-card';
import { TaskChart } from './task-chart';
import { TeamActivity } from './team-activity';
import { FolderKanban, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

interface DashboardViewProps {
  projects: any[];
}

export function DashboardView({ projects }: DashboardViewProps) {
  const [filter, setFilter] = useState<'all' | 'on-track' | 'at-risk' | 'delayed'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const totalTasks = projects.reduce((sum, p) => sum + p.totalTasks, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.tasksCompleted, 0);
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);
  const onTrackCount = projects.filter(p => p.status === 'on-track').length;
  const totalHoursLogged = projects.reduce((sum, p) => sum + (p.hoursLogged || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your project progress and team activity</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={projects.length}
          icon={<FolderKanban className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Completed Tasks"
          value={`${completedTasks}/${totalTasks}`}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="green"
          subtitle={`${overallProgress}% overall progress`}
        />
        <StatsCard
          title="On Track"
          value={onTrackCount}
          icon={<TrendingUp className="w-6 h-6" />}
          color="emerald"
          subtitle={`${projects.length - onTrackCount} need attention`}
        />
        <StatsCard
          title="Hours Logged"
          value={`${totalHoursLogged}h`}
          icon={<Clock className="w-6 h-6" />}
          color="orange"
          subtitle="This week"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskChart projects={projects} />
        </div>
        <div>
          <TeamActivity projects={projects} />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('on-track')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'on-track'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            On Track
          </button>
          <button
            onClick={() => setFilter('at-risk')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'at-risk'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            At Risk
          </button>
          <button
            onClick={() => setFilter('delayed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'delayed'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Delayed
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <h2 className="text-gray-900">Active Projects ({filteredProjects.length})</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
