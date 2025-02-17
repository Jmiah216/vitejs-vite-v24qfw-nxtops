import { MilitaryService, Job } from '../../types';
import { militaryToITSkills } from './skillsMapping';
import { calculateMatchScore } from './matchingCriteria';
import { itJobs } from './itJobs';

export interface JobMatch {
  job: Job;
  score: number;
  matchedSkills: string[];
  relevantExperience: string[];
}

function mapMilitarySkills(service: MilitaryService): string[] {
  const mappedSkills = new Set<string>();
  
  // Map selected skills
  service.selectedSkills?.forEach(skill => {
    Object.entries(militaryToITSkills).forEach(([military, itSkills]) => {
      if (skill.toLowerCase().includes(military.toLowerCase())) {
        itSkills.forEach(itSkill => mappedSkills.add(itSkill));
      }
    });
  });

  // Map responsibilities
  service.primaryCommand.responsibilities.forEach(resp => {
    Object.entries(militaryToITSkills).forEach(([military, itSkills]) => {
      if (resp.toLowerCase().includes(military.toLowerCase())) {
        itSkills.forEach(itSkill => mappedSkills.add(itSkill));
      }
    });
  });

  return Array.from(mappedSkills);
}

export async function findBestMatches(service: MilitaryService): Promise<JobMatch[]> {
  try {
    const mappedSkills = mapMilitarySkills(service);
    
    // Always return all IT jobs with match scores
    const matches = itJobs.map(job => {
      const matchedSkills = job.skills.filter(skill =>
        mappedSkills.some(mapped => 
          skill.toLowerCase().includes(mapped.toLowerCase()) ||
          mapped.toLowerCase().includes(skill.toLowerCase())
        )
      );

      const relevantExperience = job.tasks.filter(task =>
        service.primaryCommand.responsibilities.some(resp =>
          task.toLowerCase().includes(resp.toLowerCase()) ||
          resp.toLowerCase().includes(task.toLowerCase())
        )
      );

      const yearsOfService = Math.max(0,
        (new Date(service.primaryCommand.endDate).getTime() -
         new Date(service.primaryCommand.startDate).getTime()) /
        (1000 * 60 * 60 * 24 * 365)
      );

      const score = calculateMatchScore({
        skillsMatch: matchedSkills.length / job.skills.length,
        experienceMatch: relevantExperience.length / job.tasks.length,
        yearsOfService
      });

      return {
        job,
        score,
        matchedSkills,
        relevantExperience
      };
    });

    // Sort by score but don't filter any out
    return matches.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error in findBestMatches:', error);
    return []; // Return empty array instead of throwing
  }
}