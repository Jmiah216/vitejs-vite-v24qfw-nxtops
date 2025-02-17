import { MilitaryService, Job } from '../../../types';
import { translateToCirculianTerms, enhanceWithMetrics } from '../civilianTranslator';
import { calculateYearsOfService, getRelevantSkills, formatResponsibilities } from './shared';

export function generateManagementSummary(service: MilitaryService, selectedJobs: Job[]): string {
  const years = calculateYearsOfService(service);
  const managementSkills = getRelevantSkills(selectedJobs, /leadership|management|strategic|planning/i);
  const primaryJob = selectedJobs[0];

  return `IT leader with ${years}+ years of experience in ${managementSkills}. Seeking ${primaryJob.title} position to leverage proven track record in team leadership and project delivery. Demonstrated success in strategic planning and organizational transformation.`;
}

export function formatManagementExperience(responsibilities: string[]): string[] {
  return responsibilities
    .map(translateToCirculianTerms)
    .map(enhanceWithMetrics)
    .filter(resp => resp.match(/manage|lead|direct|coordinate|develop|implement|strategic/i))
    .map(resp => resp.replace(/^/, 'Effectively '));
}