import { MilitaryService, Job, Resume } from '../../types';
import { formatCommand, formatEducation, mapMilitaryToITSkills } from './formatters';

interface ResumeTemplate {
  generateSummary: (service: MilitaryService, jobs: Job[]) => string;
  formatExperience: (service: MilitaryService, jobs: Job[]) => string[];
  prioritizeSkills: (service: MilitaryService, jobs: Job[]) => string[];
}

export const templates: Record<string, ResumeTemplate> = {
  technical: {
    generateSummary: (service, jobs) => {
      const yearsOfService = Math.floor(
        (new Date(service.primaryCommand.endDate).getTime() - 
         new Date(service.primaryCommand.startDate).getTime()) / 
        (1000 * 60 * 60 * 24 * 365)
      );
      
      const itSkills = mapMilitaryToITSkills(service);
      const primaryJob = jobs[0];
      
      return `Technical professional with ${yearsOfService}+ years of military experience as ${service.rank} specializing in ${service.primaryCommand.jobTitle}. Seeking to leverage expertise in ${itSkills.slice(0, 3).join(', ')} for a role as ${primaryJob.title}. Proven track record of implementing technical solutions and maintaining mission-critical systems.`;
    },
    formatExperience: (service, jobs) => {
      const militaryExp = formatCommand(service.primaryCommand);
      const additionalExp = service.additionalCommands.flatMap(cmd => formatCommand(cmd));
      const itResponsibilities = jobs.flatMap(job => 
        job.tasks.map(task => `Capable of ${task.toLowerCase()}`)
      );
      
      return [...militaryExp, ...additionalExp, ...itResponsibilities];
    },
    prioritizeSkills: (service, jobs) => {
      const technicalSkills = mapMilitaryToITSkills(service);
      const jobSkills = jobs.flatMap(job => job.skills);
      
      return [...new Set([...technicalSkills, ...jobSkills])];
    }
  },
  
  management: {
    generateSummary: (service, jobs) => {
      const yearsOfService = Math.floor(
        (new Date(service.primaryCommand.endDate).getTime() - 
         new Date(service.primaryCommand.startDate).getTime()) / 
        (1000 * 60 * 60 * 24 * 365)
      );
      
      const primaryJob = jobs[0];
      
      return `Accomplished IT leader and ${service.rank} with ${yearsOfService}+ years of military leadership experience. Demonstrated success in team management, strategic planning, and project execution. Seeking to transition leadership expertise to ${primaryJob.title} role.`;
    },
    formatExperience: (service, jobs) => {
      const militaryExp = formatCommand(service.primaryCommand)
        .filter(exp => exp.match(/managed|led|coordinated|developed|implemented/i));
      
      const additionalExp = service.additionalCommands
        .flatMap(cmd => formatCommand(cmd))
        .filter(exp => exp.match(/managed|led|coordinated|developed|implemented/i));
      
      const leadershipResponsibilities = jobs.flatMap(job =>
        job.tasks
          .filter(task => task.match(/manage|lead|coordinate|develop|implement/i))
          .map(task => `Qualified to ${task.toLowerCase()}`)
      );
      
      return [...militaryExp, ...additionalExp, ...leadershipResponsibilities];
    },
    prioritizeSkills: (service, jobs) => {
      const leadershipSkills = mapMilitaryToITSkills(service)
        .filter(skill => skill.match(/leadership|management|strategic|planning/i));
      const jobSkills = jobs.flatMap(job => 
        job.skills.filter(skill => skill.match(/management|leadership|strategy/i))
      );
      
      return [...new Set([...leadershipSkills, ...jobSkills])];
    }
  },
  
  professional: {
    generateSummary: (service, jobs) => {
      const yearsOfService = Math.floor(
        (new Date(service.primaryCommand.endDate).getTime() - 
         new Date(service.primaryCommand.startDate).getTime()) / 
        (1000 * 60 * 60 * 24 * 365)
      );
      
      const primaryJob = jobs[0];
      const relevantSkills = mapMilitaryToITSkills(service)
        .filter(skill => jobs.some(job => 
          job.skills.some(jobSkill => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        ))
        .slice(0, 3);
      
      return `Results-driven professional with ${yearsOfService}+ years of military experience as ${service.rank}. Expertise in ${relevantSkills.join(', ')}. Seeking to leverage military background and technical skills as ${primaryJob.title}.`;
    },
    formatExperience: (service, jobs) => {
      const militaryExp = formatCommand(service.primaryCommand);
      const additionalExp = service.additionalCommands.flatMap(cmd => formatCommand(cmd));
      const professionalExp = jobs.flatMap(job =>
        job.tasks.map(task => `Prepared to ${task.toLowerCase()}`)
      );
      
      return [...militaryExp, ...additionalExp, ...professionalExp];
    },
    prioritizeSkills: (service, jobs) => {
      return [...new Set([
        ...mapMilitaryToITSkills(service),
        ...jobs.flatMap(job => job.skills)
      ])];
    }
  }
};