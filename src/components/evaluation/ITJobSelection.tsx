import React, { useState } from 'react';
import { Job, MilitaryService } from '../../types';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { generateResumes } from '../../lib/resumeGeneration/generator';
import { ResumePreview } from './ResumePreview';

interface Props {
  militaryInfo: MilitaryService;
  onJobsSelected: (jobs: Job[]) => void;
}

export function ITJobSelection({ militaryInfo, onJobsSelected }: Props) {
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [showResumes, setShowResumes] = useState(false);
  const [generatedResumes, setGeneratedResumes] = useState<Record<string, Resume>>();

  const handleJobToggle = (job: Job) => {
    setSelectedJobs(prev => {
      const isSelected = prev.some(j => j.code === job.code);
      if (isSelected) {
        return prev.filter(j => j.code !== job.code);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, job];
    });
  };

  const handleGenerateResumes = () => {
    if (selectedJobs.length === 0) return;

    const resumes = generateResumes(
      militaryInfo,
      selectedJobs,
      militaryInfo.personalInfo,
      militaryInfo.education,
      militaryInfo.skills
    );

    setGeneratedResumes(resumes);
    setShowResumes(true);
    onJobsSelected(selectedJobs);
  };

  if (showResumes && generatedResumes) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button onClick={() => setShowResumes(false)} variant="outline">
            ← Back to Job Selection
          </Button>
          <div className="text-gray-600">
            Selected Careers: {selectedJobs.map(job => job.title).join(', ')}
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(generatedResumes).map(([variant, resume]) => (
            <ResumePreview
              key={variant}
              resume={resume}
              variant={variant as 'technical' | 'management' | 'corporate'}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Select IT Careers</h3>
        <span className="text-sm text-gray-600">
          Selected: {selectedJobs.length}/3
        </span>
      </div>

      {/* Job selection UI remains the same */}

      <div className="flex justify-end">
        <Button
          onClick={handleGenerateResumes}
          disabled={selectedJobs.length === 0}
        >
          Generate Professional Resumes
        </Button>
      </div>
    </div>
  );
}