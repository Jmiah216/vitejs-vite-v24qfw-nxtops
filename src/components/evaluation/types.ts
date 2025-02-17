import { PersonalInfo, MilitaryService, Education, Job } from '../../types';

export interface FormState {
  personalInfo: PersonalInfo;
  militaryService: MilitaryService;
  education: Education[];
  skills: string[];
  step: 'form' | 'jobs' | 'preview';
  selectedJobs?: Job[];
}

export const initialFormState: FormState = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: ''
  },
  militaryService: {
    rank: '',
    branch: '',
    primaryCommand: {
      name: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      responsibilities: []
    },
    additionalCommands: []
  },
  education: [],
  skills: [],
  step: 'form'
};