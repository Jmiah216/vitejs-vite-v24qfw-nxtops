import { MilitaryService } from '../../types';
import { translateMilitaryJobTitle } from '../utils/militaryTranslator';

interface SummaryTemplateParams {
  rank: string;
  yearsOfService: number;
  militaryRole: string;
  civilianRole: string;
}

type SummaryTemplateFunction = (params: SummaryTemplateParams) => string;

export const summaryTemplates: Record<string, SummaryTemplateFunction> = {
  corporate: ({ rank, yearsOfService, militaryRole, civilianRole }) => 
    `Results-driven ${rank} veteran with ${yearsOfService} years of military experience, transitioning from ${militaryRole} to ${civilianRole}. Proven track record in organizational leadership, strategic planning, and cross-functional team management. Demonstrated success in delivering results while managing complex projects and stakeholder relationships.`,

  management: ({ rank, yearsOfService, militaryRole, civilianRole }) =>
    `Accomplished ${rank} leader with ${yearsOfService} years of military experience as ${militaryRole}, seeking to transition leadership expertise to ${civilianRole}. Expert in personnel management, resource allocation, and strategic planning. Proven ability to lead high-performance teams and drive organizational excellence.`,

  technical: ({ rank, yearsOfService, militaryRole, civilianRole }) =>
    `Technical professional and ${rank} veteran with ${yearsOfService} years of hands-on experience as ${militaryRole}. Seeking to leverage military technical expertise as ${civilianRole}. Demonstrated success in implementing technical solutions, maintaining mission-critical systems, and optimizing operational efficiency.`
};

export function generateSummary(
  militaryService: MilitaryService,
  variant: keyof typeof summaryTemplates
): string {
  const yearsOfService = calculateYearsOfService(militaryService);
  const civilianRole = translateMilitaryJobTitle(militaryService.primaryCommand.jobTitle);

  return summaryTemplates[variant]({
    rank: militaryService.rank,
    yearsOfService,
    militaryRole: militaryService.primaryCommand.jobTitle,
    civilianRole
  });
}

function calculateYearsOfService(militaryService: MilitaryService): number {
  const startDate = new Date(militaryService.primaryCommand.startDate);
  const endDate = new Date(militaryService.primaryCommand.endDate);
  return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
}