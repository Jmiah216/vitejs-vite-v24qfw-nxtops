import React, { useState } from 'react';
import { PersonalInfo, MilitaryService, Education, Job } from '../../types';
import { Button } from '../ui/button';
import { TechnicalResume } from './resumes/TechnicalResume';
import { ManagementResume } from './resumes/ManagementResume';
import { CorporateResume } from './resumes/CorporateResume';
import { ResumeEditor } from './ResumeEditor';

interface Props {
  personalInfo: PersonalInfo;
  militaryService: MilitaryService;
  education: Education[];
  skills: string[];
  selectedJobs: Job[];
  onUpdate?: (updates: {
    personalInfo: PersonalInfo;
    militaryService: MilitaryService;
    education: Education[];
    skills: string[];
  }) => void;
}

export function ResumePreview({ 
  personalInfo, 
  militaryService, 
  education, 
  skills, 
  selectedJobs,
  onUpdate 
}: Props) {
  const [activeResume, setActiveResume] = useState<'technical' | 'management' | 'corporate'>('technical');
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ResumeEditor
        personalInfo={personalInfo}
        militaryService={militaryService}
        education={education}
        skills={skills}
        onSave={(updates) => {
          onUpdate?.(updates);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Professional Resumes</h2>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit Resume
          </Button>
          <div className="flex gap-2">
            <Button
              variant={activeResume === 'technical' ? 'default' : 'outline'}
              onClick={() => setActiveResume('technical')}
            >
              Technical
            </Button>
            <Button
              variant={activeResume === 'management' ? 'default' : 'outline'}
              onClick={() => setActiveResume('management')}
            >
              Management
            </Button>
            <Button
              variant={activeResume === 'corporate' ? 'default' : 'outline'}
              onClick={() => setActiveResume('corporate')}
            >
              Corporate
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        {activeResume === 'technical' && (
          <TechnicalResume
            personalInfo={personalInfo}
            militaryService={militaryService}
            education={education}
            skills={skills}
            selectedJobs={selectedJobs}
          />
        )}
        {activeResume === 'management' && (
          <ManagementResume
            personalInfo={personalInfo}
            militaryService={militaryService}
            education={education}
            skills={skills}
            selectedJobs={selectedJobs}
          />
        )}
        {activeResume === 'corporate' && (
          <CorporateResume
            personalInfo={personalInfo}
            militaryService={militaryService}
            education={education}
            skills={skills}
            selectedJobs={selectedJobs}
          />
        )}
      </div>
    </div>
  );
}