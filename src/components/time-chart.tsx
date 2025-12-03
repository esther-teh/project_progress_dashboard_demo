import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeEntry {
  id: string;
  projectName: string;
  duration: number;
  date: string;
}

interface TimeChartProps {
  timeEntries: TimeEntry[];
  projects: any[];
}

export function TimeChart({ timeEntries, projects }: TimeChartProps) {
  // Group time entries by project
  const projectTimeMap: Record<string, number> = {};
  
  timeEntries.forEach(entry => {
    projectTimeMap[entry.projectName] = (projectTimeMap[entry.projectName] || 0) + entry.duration;
  });

  // Add estimated time from projects
  const chartData = projects.map(project => {
    const logged = (projectTimeMap[project.name] || 0) / 60; // Convert to hours
    const estimated = project.estimatedHours || 0;
    
    return {
      name: project.name.length > 15 ? project.name.substring(0, 15) + '...' : project.name,
      logged: Math.round(logged * 10) / 10,
      estimated: estimated,
      remaining: Math.max(0, estimated - logged)
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-900 mb-4">Time Distribution by Project</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="#6b7280"
            label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem'
            }}
            formatter={(value: number) => `${value}h`}
          />
          <Legend />
          <Bar dataKey="logged" fill="#3b82f6" name="Time Logged" radius={[4, 4, 0, 0]} />
          <Bar dataKey="remaining" fill="#d1d5db" name="Remaining" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
