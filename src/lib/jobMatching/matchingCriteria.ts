export interface MatchingCriteria {
  skillsMatch: number;
  experienceMatch: number;
  yearsOfService: number;
}

export function calculateMatchScore(criteria: MatchingCriteria): number {
  const weights = {
    skills: 0.4,
    experience: 0.3,
    service: 0.3
  };

  const score = 
    (criteria.skillsMatch * weights.skills +
    criteria.experienceMatch * weights.experience +
    Math.min(criteria.yearsOfService / 10, 1) * weights.service) * 100;

  return Math.round(score);
}