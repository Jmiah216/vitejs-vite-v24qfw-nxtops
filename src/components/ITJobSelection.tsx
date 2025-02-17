import React from 'react';
import { Job } from '../types';
import { JobMatches } from './JobMatches';

interface Props {
  onJobsSelected: (jobs: Job[]) => void;
}

export function ITJobSelection({ onJobsSelected }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Select IT Career Matches</h3>
      <p className="text-gray-600">
        Based on your military experience and skills, here are your best matches in IT.
        Select up to 3 positions to include in your resume.
      </p>
      <JobMatches onJobSelect={onJobsSelected} />
    </div>
  );
}