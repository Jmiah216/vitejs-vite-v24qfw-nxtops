export interface AssessmentQuestion {
  id: string | number;
  text: string;
  type: 'select' | 'multiSelect' | 'multiSelectLimited' | 'multiSelectExclusive' | 'scale';
  category: string;
  options?: string[];
  maxSelections?: number;
  description?: string;
  customOption?: {
    label: string;
    placeholder: string;
  };
  dependsOn?: {
    questionId: string | number;
    value: string;
  };
  labels?: Record<number, string>;
}

export interface SecurityClearance {
  eligible: 'Yes' | 'No' | 'Unsure';
  current: string;
  otherClearance?: string;
}

export interface ToolsAndCertifications {
  tools: string[];
  otherTools?: string[];
  interestedInCertifications: boolean;
  desiredCertifications?: string[];
  otherCertifications?: string[];
}

export interface CareerAssessment {
  leadership: number;
  technical: number;
  analytical: number;
  communication: number;
  projectManagement: number;
  selectedSkills?: string[];
  interests?: string[];
  salaryExpectations?: string;
  workEnvironment?: string[];
  relocation?: string;
  educationPlans?: string;
  selectedJobs?: Job[];
  securityClearance?: SecurityClearance;
  toolsAndCertifications?: ToolsAndCertifications;
}