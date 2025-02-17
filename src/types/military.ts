export interface Command {
  unit: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  completionDate: string;
}

export interface Certification {
  name: string;
  issuingOrg: string;
  dateObtained: string;
}

export interface MilitaryInfo {
  user_id?: string;
  branch: string;
  rank: string;
  jobTitle: string;
  unit: string;
  startDate: string;
  endDate: string;
  commands: Command[];
  responsibilities: string[];
  education?: Education[];
  certifications?: Certification[];
}