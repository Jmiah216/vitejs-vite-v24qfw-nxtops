export interface Job {
  title: string;
  code: string;
  description: string;
  skills: string[];
  tasks: string[];
  salary: {
    median: string;
    range: string;
  };
  certifications: {
    novice: string[];
    intermediate: string[];
    expert: string[];
  };
  outlook: string;
  matchScore?: number;
}