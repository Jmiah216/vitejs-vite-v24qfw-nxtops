import { MilitaryService, Job } from '../../../types';
import { translateToCirculianTerms, enhanceWithMetrics } from '../civilianTranslator';

export function generateCorporateSummary(service: MilitaryService, selectedJobs: Job[]): string {
  const primaryJob = selectedJobs[0];
  const corporateSkills = selectedJobs
    .flatMap(job => job.skills)
    .filter(skill => skill.match(/business|communication|project|strategy|operations/i))
    .slice(0, 3)
    .join(', ');

  return `Business technology professional with expertise in ${corporateSkills}. Seeking ${primaryJob.title} role to drive organizational success through effective technology solutions. Proven track record of delivering results while managing cross-functional teams and complex projects.`;
}

export function formatCorporateExperience(responsibilities: string[]): string[] {
  return responsibilities
    .map(translateToCirculianTerms)
    .map(enhanceWithMetrics)
    .filter(resp => resp.match(/business|communicate|project|strategy|operations|coordinate/i));
}