import { Job, MilitaryService } from '../../types';
import { calculateMatchScore, MatchingCriteria } from './matchingCriteria';
import { translateMilitaryJobTitle } from '../utils/militaryTranslator';

export async function findMatchingITJobs(service: MilitaryService): Promise<Job[]> {
  const criteria: MatchingCriteria = {
    branch: service.branch,
    jobTitle: service.primaryCommand.jobTitle,
    skills: service.selectedSkills || [],
    responsibilities: service.primaryCommand.responsibilities,
    yearsOfService: calculateYearsOfService(service)
  };

  // Get all available IT jobs
  const allJobs = await fetchITJobs();

  // Score and sort jobs
  const scoredJobs = allJobs.map(job => ({
    ...job,
    matchScore: calculateMatchScore(criteria, job.skills, job.tasks)
  })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  // Return top matches
  return scoredJobs.slice(0, 5);
}

function calculateYearsOfService(service: MilitaryService): number {
  const start = new Date(service.primaryCommand.startDate);
  const end = new Date(service.primaryCommand.endDate);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
}

async function fetchITJobs(): Promise<Job[]> {
  // This would typically fetch from an API
  // For now, return mock data
  return [
    {
      title: "Information Security Analyst",
      code: "15-1212.00",
      description: "Plan and implement security measures",
      skills: ["Cybersecurity", "Network Security", "Risk Analysis"],
      tasks: [
        "Monitor security threats",
        "Implement security protocols",
        "Conduct security assessments"
      ],
      salary: {
        median: "$102,600",
        range: "$61,520 - $165,920"
      },
      certifications: {
        novice: ["Security+"],
        intermediate: ["CISSP Associate"],
        expert: ["CISSP"]
      },
      outlook: "Much faster than average"
    },
    // Add more jobs...
  ];
}