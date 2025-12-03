interface Project {
  team: string[];
}

interface TeamActivityProps {
  projects: Project[];
}

export function TeamActivity({ projects }: TeamActivityProps) {
  // Count how many projects each team member is on
  const teamMemberCount: Record<string, number> = {};
  
  projects.forEach(project => {
    project.team.forEach(member => {
      teamMemberCount[member] = (teamMemberCount[member] || 0) + 1;
    });
  });

  const sortedTeamMembers = Object.entries(teamMemberCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-900 mb-4">Team Workload</h3>
      <div className="space-y-4">
        {sortedTeamMembers.map(([member, count]) => (
          <div key={member}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                  {member.charAt(0)}
                </div>
                <span className="text-gray-900">{member}</span>
              </div>
              <span className="text-gray-600">{count} {count === 1 ? 'project' : 'projects'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${(count / projects.length) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
