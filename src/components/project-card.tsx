import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';

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
  estimatedHours?: number;
  hoursLogged?: number;
}

interface ProjectCardProps {
  project: Project;
}

const statusConfig = {
  'on-track': {
    label: 'On Track',
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  'at-risk': {
    label: 'At Risk',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  'delayed': {
    label: 'Delayed',
    color: 'bg-red-100 text-red-700 border-red-200'
  }
};

const progressColor = (progress: number, status: string) => {
  if (status === 'delayed') return 'bg-red-500';
  if (status === 'at-risk') return 'bg-yellow-500';
  return 'bg-green-500';
};

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const dueDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-gray-900 flex-1">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full border ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4">{project.description}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Progress</span>
          <span className="text-gray-900">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all ${progressColor(
              project.progress,
              project.status
            )}`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-600">
          <CheckCircle className="w-4 h-4" />
          <span>
            {project.tasksCompleted}/{project.totalTasks} tasks
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{dueDate}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span>{project.team.length} members</span>
        </div>
        {project.hoursLogged !== undefined && project.estimatedHours !== undefined && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{project.hoursLogged}/{project.estimatedHours}h</span>
          </div>
        )}
      </div>
    </div>
  );
}
