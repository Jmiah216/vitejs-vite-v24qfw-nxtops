import { CareerAssessment, Job, Resume } from '../../types';

export function generateResumes(assessment: CareerAssessment, selectedJobs: Job[]): Record<string, Resume> {
  // Create base resume data
  const baseResume: Omit<Resume, 'summary' | 'variant'> = {
    personalInfo: {
      name: 'John Doe', // This should come from user profile in real app
      email: 'john@example.com',
      phone: '555-555-5555',
      location: 'City, State'
    },
    skills: assessment.selectedSkills || [],
    selectedJobs
  };

  // Generate variant-specific resumes
  return {
    technical: {
      ...baseResume,
      summary: generateTechnicalSummary(assessment, selectedJobs),
      variant: 'technical'
    },
    management: {
      ...baseResume,
      summary: generateManagementSummary(assessment, selectedJobs),
      variant: 'management'
    },
    corporate: {
      ...baseResume,
      summary: generateCorporateSummary(assessment, selectedJobs),
      variant: 'corporate'
    }
  };
}

function generateTechnicalSummary(assessment: CareerAssessment, jobs: Job[]): string {
  const techSkills = assessment.selectedSkills?.filter(skill => 
    skill.toLowerCase().includes('technical') || 
    skill.toLowerCase().includes('system') ||
    skill.toLowerCase().includes('software')
  ) || [];

  return `Technical professional with strong background in ${techSkills.slice(0, 3).join(', ')}. Seeking role as ${jobs[0]?.title || 'IT Professional'} to leverage technical expertise and problem-solving skills.`;
}

function generateManagementSummary(assessment: CareerAssessment, jobs: Job[]): string {
  const leadershipSkills = assessment.selectedSkills?.filter(skill =>
    skill.toLowerCase().includes('leadership') ||
    skill.toLowerCase().includes('management')
  ) || [];

  return `IT leader with proven experience in ${leadershipSkills.slice(0, 3).join(', ')}. Seeking ${jobs[0]?.title || 'leadership role'} to drive technical initiatives and team success.`;
}

function generateCorporateSummary(assessment: CareerAssessment, jobs: Job[]): string {
  const businessSkills = assessment.selectedSkills?.filter(skill =>
    skill.toLowerCase().includes('business') ||
    skill.toLowerCase().includes('communication') ||
    skill.toLowerCase().includes('project')
  ) || [];

  return `Business technology professional specializing in ${businessSkills.slice(0, 3).join(', ')}. Seeking ${jobs[0]?.title || 'professional role'} to deliver business value through technology solutions.`;
}