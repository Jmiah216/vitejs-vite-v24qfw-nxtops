import React from 'react';
import { Resume } from '../../../types';
import { ResumeHeader } from './ResumeHeader';
import { ResumeSummary } from './ResumeSummary';
import { MilitaryExperience } from './MilitaryExperience';
import { SkillsSection } from './SkillsSection';
import { EducationSection } from './EducationSection';
import { useCivilianJobTitle } from '../../../hooks/useCivilianJobTitle';

interface Props {
  resume: Resume;
  variant: 'corporate' | 'management' | 'technical';
  onPrint?: () => void;
}

export function ResumePreview({ resume, variant, onPrint }: Props) {
  const { civilianJobTitle } = useCivilianJobTitle(resume.militaryService);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="max-w-4xl mx-auto">
        <ResumeHeader variant={variant} onPrint={onPrint} />
        <ResumeSummary
          resume={resume}
          variant={variant}
          civilianJobTitle={civilianJobTitle}
        />
        <MilitaryExperience
          militaryService={resume.militaryService}
          civilianJobTitle={civilianJobTitle}
        />
        <SkillsSection skills={resume.skills} />
        <EducationSection education={resume.education} />
      </div>
    </div>
  );
}