import { MilitaryService, Job } from '../../types';

export function calculateYearsOfService(service: MilitaryService): number {
  const start = new Date(service.primaryCommand.startDate);
  const end = new Date(service.primaryCommand.endDate);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
}

export function getRelevantSkills(jobs: Job[], pattern: RegExp): string {
  return jobs
    .flatMap(job => job.skills)
    .filter(skill => skill.match(pattern))
    .slice(0, 3)
    .join(', ');
}

export function formatResponsibilities(
  responsibilities: string[],
  pattern: RegExp,
  prefix: string = ''
): string[] {
  return responsibilities
    .filter(resp => resp.match(pattern))
    .map(resp => prefix + resp.toLowerCase());
}