import { militaryToITSkills, itJobCategories } from './skillsMapping';
import { MilitaryEvaluation, Job } from '../../types';
import { searchMilitaryToONET } from '../onet';

interface MatchResult {
  job: Job;
  score: number;
  matchedSkills: string[];
  relevantExperience: string[];
}

export async function findITJobMatches(evaluation: MilitaryEvaluation): Promise<MatchResult[]> {
  if (!evaluation?.branch || !evaluation?.jobTitle) {
    throw new Error('Military branch and job title are required');
  }

  try {
    // Get initial matches from O*NET based on military occupation
    const onetMatches = await searchMilitaryToONET(evaluation.branch, evaluation.jobTitle);
    
    // Map military skills to IT skills
    const itSkills = mapMilitarySkillsToIT(evaluation.selectedSkills || []);
    
    // Get additional matches based on mapped skills
    const skillBasedMatches = await findMatchesBySkills(itSkills);
    
    // Combine and deduplicate matches
    const uniqueMatches = Array.from(
      new Map([...onetMatches, ...skillBasedMatches].map(job => [job.code, job])).values()
    );
    
    // Score all matches
    const scoredMatches = scoreMatches(uniqueMatches, evaluation, itSkills);
    
    // Sort by score and return top matches
    return scoredMatches
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  } catch (error) {
    console.error('Error finding IT job matches:', error);
    // Return fallback matches instead of throwing
    return getFallbackMatches(evaluation);
  }
}

function mapMilitarySkillsToIT(militarySkills: string[]): string[] {
  const itSkills = new Set<string>();
  
  militarySkills.forEach(skill => {
    const lowerSkill = skill.toLowerCase();
    
    Object.entries(militaryToITSkills).forEach(([military, itSkillList]) => {
      if (lowerSkill.includes(military)) {
        itSkillList.forEach(itSkill => itSkills.add(itSkill));
      }
    });
  });
  
  return Array.from(itSkills);
}

async function findMatchesBySkills(itSkills: string[]): Promise<Job[]> {
  const matches: Job[] = [];
  
  for (const category of Object.values(itJobCategories)) {
    const hasRelevantSkills = category.skills.some(skill =>
      itSkills.some(itSkill => itSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    
    if (hasRelevantSkills) {
      for (const roleCode of category.roles) {
        try {
          const jobs = await searchMilitaryToONET('', roleCode);
          matches.push(...jobs);
        } catch (error) {
          console.error(`Error fetching jobs for role ${roleCode}:`, error);
        }
      }
    }
  }
  
  return matches;
}

function scoreMatches(
  jobs: Job[],
  evaluation: MilitaryEvaluation,
  itSkills: string[]
): MatchResult[] {
  return jobs.map(job => {
    const matchedSkills = findMatchingSkills(job.skills, itSkills);
    const relevantExperience = findRelevantExperience(job.tasks, evaluation.responsibilities);
    
    const score = calculateMatchScore({
      skillsMatch: matchedSkills.length / Math.max(job.skills.length, 1),
      experienceMatch: relevantExperience.length / Math.max(job.tasks.length, 1),
      yearsOfService: calculateYearsOfService(evaluation),
      hasRelevantCertifications: hasRelevantCerts(evaluation.certifications, job.title)
    });
    
    return {
      job,
      score,
      matchedSkills,
      relevantExperience
    };
  });
}

function findMatchingSkills(jobSkills: string[], itSkills: string[]): string[] {
  return jobSkills.filter(jobSkill =>
    itSkills.some(itSkill =>
      jobSkill.toLowerCase().includes(itSkill.toLowerCase()) ||
      itSkill.toLowerCase().includes(jobSkill.toLowerCase())
    )
  );
}

function findRelevantExperience(jobTasks: string[], responsibilities: string[]): string[] {
  return jobTasks.filter(task =>
    responsibilities.some(resp =>
      task.toLowerCase().includes(resp.toLowerCase()) ||
      resp.toLowerCase().includes(task.toLowerCase())
    )
  );
}

function calculateMatchScore(criteria: {
  skillsMatch: number;
  experienceMatch: number;
  yearsOfService: number;
  hasRelevantCertifications: boolean;
}): number {
  const weights = {
    skills: 0.4,
    experience: 0.3,
    service: 0.2,
    certifications: 0.1
  };
  
  return Math.round(
    (criteria.skillsMatch * weights.skills +
    criteria.experienceMatch * weights.experience +
    Math.min(criteria.yearsOfService / 10, 1) * weights.service +
    (criteria.hasRelevantCertifications ? weights.certifications : 0)) * 100
  );
}

function calculateYearsOfService(evaluation: MilitaryEvaluation): number {
  if (!evaluation.startDate || !evaluation.endDate) return 0;
  const start = new Date(evaluation.startDate);
  const end = new Date(evaluation.endDate);
  return Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
}

function hasRelevantCerts(
  certifications: MilitaryEvaluation['certifications'],
  jobTitle: string
): boolean {
  if (!certifications?.length) return false;
  
  const relevantKeywords = jobTitle.toLowerCase().split(' ');
  return certifications.some(cert =>
    relevantKeywords.some(keyword =>
      cert.name.toLowerCase().includes(keyword) ||
      cert.fieldOfStudy?.toLowerCase().includes(keyword)
    )
  );
}

function getFallbackMatches(evaluation: MilitaryEvaluation): MatchResult[] {
  const fallbackJobs: Job[] = [
    {
      title: "IT Project Manager",
      code: "15-1199.09",
      description: "Plan and coordinate IT projects and team activities",
      skills: ["Project Management", "Leadership", "Technical Planning"],
      tasks: [
        "Lead technical teams",
        "Manage project timelines",
        "Coordinate resources"
      ],
      salary: {
        median: "$98,420",
        range: "$57,440 - $159,140"
      },
      certifications: {
        novice: ["CAPM"],
        intermediate: ["PMP"],
        expert: ["PgMP"]
      },
      outlook: "Growing faster than average"
    },
    {
      title: "Systems Administrator",
      code: "15-1244.00",
      description: "Install, configure, and maintain computer systems",
      skills: ["System Administration", "Network Security", "Technical Support"],
      tasks: [
        "Maintain system security",
        "Configure networks",
        "Provide technical support"
      ],
      salary: {
        median: "$85,990",
        range: "$52,830 - $134,970"
      },
      certifications: {
        novice: ["CompTIA A+"],
        intermediate: ["MCSA"],
        expert: ["MCSE"]
      },
      outlook: "Stable growth"
    }
  ];

  return fallbackJobs.map(job => ({
    job,
    score: 75, // Default reasonable match score
    matchedSkills: job.skills.slice(0, 2),
    relevantExperience: job.tasks.slice(0, 2)
  }));
}