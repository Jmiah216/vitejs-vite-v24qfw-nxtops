import type { PersonalInfo } from './personalInfo';
import type { MilitaryService } from './military';
import type { Education } from './education';
import type { Job } from './job';

export interface Resume {
  personalInfo: PersonalInfo;
  militaryService: MilitaryService;
  education: Education[];
  skills: string[];
  awards: string[];
  selectedJobs?: Job[];
  summary?: string;
  experience?: string[];
}