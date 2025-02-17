import React, { useState } from 'react';
import { Button } from './ui/button';
import { MilitaryEvaluation, Command, Job } from '../types';
import { SkillsSelector } from './SkillsSelector';
import { ResponsibilityInput } from './ResponsibilityInput';
import { ItemList } from './ItemList';
import { JobTitleInput } from './JobTitleInput';
import { LocationInput } from './LocationInput';
import { EducationSection } from './EducationSection';
import { CertificationSection } from './CertificationSection';
import { ITJobSelection } from './ITJobSelection';
import { CommandResponsibilities } from './CommandResponsibilities';
import { militaryRanks } from '../lib/militaryData';

interface Props {
  onSubmit: (evaluation: MilitaryEvaluation) => void;
}

export function EvaluationForm({ onSubmit }: Props) {
  const [evaluation, setEvaluation] = useState<MilitaryEvaluation>({
    rank: '',
    branch: '',
    jobTitle: '',
    unit: '',
    location: {
      city: '',
      state: ''
    },
    startDate: '',
    endDate: '',
    responsibilities: [],
    awards: [],
    skills: [],
    selectedSkills: [],
    education: [],
    certifications: [],
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    additionalCommands: []
  });

  const handleJobsSelected = (selectedJobs: Job[]) => {
    onSubmit({
      ...evaluation,
      selectedITJobs: selectedJobs.map(job => job.code)
    });
  };

  // ... rest of the component implementation remains the same ...

  return (
    <div className="space-y-6 bg-white shadow-lg rounded-lg p-6">
      {/* ... other form sections remain the same ... */}
      
      {/* IT Job Selection */}
      <ITJobSelection onJobsSelected={handleJobsSelected} />
    </div>
  );
}