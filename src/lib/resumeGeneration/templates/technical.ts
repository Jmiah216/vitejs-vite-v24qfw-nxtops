import { MilitaryService, Job } from '../../../types';
import { translateToCirculianTerms, enhanceWithMetrics } from '../civilianTranslator';
import { calculateYearsOfService, getRelevantSkills, formatResponsibilities } from './shared';

export function generateTechnicalSummary(service: MilitaryService, selectedJobs: Job[]): string {
  const years = calculateYearsOfService(service);
  const technicalSkills = getRelevantSkills(selectedJobs, /technical|system|software|network|security/i);
  const primaryJob = selectedJobs[0];

  return `Technical professional with ${years}+ years of military experience specializing in ${technicalSkills}. Seeking ${primaryJob.title} role to leverage expertise in implementing technical solutions and maintaining mission-critical systems. Strong background in problem-solving and system optimization.`;
}

export function formatTechnicalExperience(responsibilities: string[]): string[] {
  return responsibilities
    .map(translateToCirculianTerms)
    .map(enhanceWithMetrics)
    .filter(resp => resp.match(/technical|system|software|network|security|maintain|implement|develop|analyze/i))
    .map(resp => resp.replace(/^/, 'Successfully '));
}