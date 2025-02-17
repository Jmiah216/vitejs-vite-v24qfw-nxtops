import { MilitaryService, Command, Education, Job } from '../../types';

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
}

export function formatCommand(command: Command): string[] {
  return command.responsibilities.map(resp => {
    // Convert military terms to civilian equivalents
    let civilian = resp
      .replace(/commanded|led/gi, 'managed')
      .replace(/troops|soldiers/gi, 'team members')
      .replace(/mission/gi, 'project')
      .replace(/combat/gi, 'critical')
      .replace(/tactical/gi, 'strategic');
    
    // Add metrics if not present
    if (!civilian.match(/\d+/)) {
      if (civilian.match(/managed|led|supervised/i)) {
        civilian += ' of 10+ team members';
      }
      if (civilian.match(/budget|resources/i)) {
        civilian += ' valued at $500K+';
      }
    }
    
    return civilian;
  });
}

export function mapMilitaryToITSkills(militaryService: MilitaryService): string[] {
  const militaryToIT: Record<string, string[]> = {
    'leadership': ['Project Management', 'Team Leadership'],
    'communications': ['Network Administration', 'Systems Engineering'],
    'intelligence': ['Data Analysis', 'Information Security'],
    'technical': ['Systems Administration', 'Technical Support'],
    'operations': ['Operations Management', 'Process Improvement'],
    'maintenance': ['Systems Maintenance', 'Infrastructure Management']
  };

  const allSkills = new Set<string>();
  
  if (militaryService.primaryCommand) {
    militaryService.primaryCommand.responsibilities.forEach(resp => {
      Object.entries(militaryToIT).forEach(([military, itSkills]) => {
        if (resp.toLowerCase().includes(military)) {
          itSkills.forEach(skill => allSkills.add(skill));
        }
      });
    });
  }

  if (militaryService.additionalCommands) {
    militaryService.additionalCommands.forEach(command => {
      command.responsibilities.forEach(resp => {
        Object.entries(militaryToIT).forEach(([military, itSkills]) => {
          if (resp.toLowerCase().includes(military)) {
            itSkills.forEach(skill => allSkills.add(skill));
          }
        });
      });
    });
  }

  return Array.from(allSkills);
}

export function formatJobRequirements(jobs: Job[]): string[] {
  return jobs.flatMap(job => 
    job.tasks.map(task => `Demonstrated ability to ${task.toLowerCase()}`)
  );
}