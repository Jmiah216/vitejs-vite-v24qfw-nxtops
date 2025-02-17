import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MilitaryEvaluation } from '../types';
import { searchMilitaryToONET, OnetJob, getMOCCrosswalkURL } from '../lib/onet';
import { JobLoadingSpinner } from './JobLoadingSpinner';
import { JobLoadingError } from './JobLoadingError';
import { JobCard } from './JobCard';
import ResumePreview from './ResumePreview';
import { generateResumes } from '../lib/resumeGenerator';
import { findAlternativeMatches } from '../lib/careerMatching';

interface Props {
  militaryInfo: MilitaryEvaluation;
  onJobsSelected: (jobs: OnetJob[]) => void;
}

export function ONETJobSelector({ militaryInfo, onJobsSelected }: Props) {
  const [matchingJobs, setMatchingJobs] = useState<Array<OnetJob & { selected: boolean }>>([]);
  const [alternativeJobs, setAlternativeJobs] = useState<OnetJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResumes, setShowResumes] = useState(false);
  const [selectedJob, setSelectedJob] = useState<OnetJob | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadJobs = async () => {
      if (!militaryInfo?.branch || !militaryInfo?.jobTitle) {
        setError('Military branch and job title are required');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Try to get direct matches first
        const jobs = await searchMilitaryToONET(militaryInfo.branch, militaryInfo.jobTitle);
        
        if (!mounted) return;

        if (!jobs.length) {
          // If no direct matches, get alternative matches
          const alternatives = await findAlternativeMatches({
            leadership: 0,
            technical: 0,
            analytical: 0,
            communication: 0,
            projectManagement: 0,
            selectedSkills: militaryInfo.selectedSkills
          }, militaryInfo.selectedSkills);
          
          setAlternativeJobs(alternatives);
        } else {
          const uniqueJobs = Array.from(new Map(jobs.map(job => [job.code, job])).values());
          setMatchingJobs(uniqueJobs.map(job => ({ ...job, selected: false })));
        }
      } catch (error) {
        if (!mounted) return;
        
        console.error('Error loading jobs:', error);
        setError(error instanceof Error ? error.message : 'Failed to load jobs. Please try again.');
        
        // Load alternative matches as fallback
        try {
          const alternatives = await findAlternativeMatches({
            leadership: 0,
            technical: 0,
            analytical: 0,
            communication: 0,
            projectManagement: 0,
            selectedSkills: militaryInfo.selectedSkills
          }, militaryInfo.selectedSkills);
          
          if (mounted) {
            setAlternativeJobs(alternatives);
          }
        } catch (altError) {
          if (mounted) {
            console.error('Error loading alternative matches:', altError);
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      mounted = false;
    };
  }, [militaryInfo]);

  const handleJobSelection = (job: OnetJob) => {
    setSelectedJob(job);
    setShowResumes(true);
  };

  const handleBackToJobs = () => {
    setShowResumes(false);
    setSelectedJob(null);
  };

  const handleViewONET = () => {
    window.open(getMOCCrosswalkURL(), '_blank');
  };

  if (loading) {
    return <JobLoadingSpinner />;
  }

  if (error && !alternativeJobs.length) {
    return (
      <JobLoadingError
        error={error}
        onRetry={() => setError(null)}
        onViewONET={handleViewONET}
      />
    );
  }

  if (showResumes && selectedJob) {
    const evaluationWithJob = {
      ...militaryInfo,
      civilianJobTitle: selectedJob.title,
      civilianResponsibilities: selectedJob.tasks,
      civilianSkills: selectedJob.skills,
      salary: selectedJob.salary,
      outlook: selectedJob.outlook
    };

    const resumes = generateResumes(evaluationWithJob);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button onClick={handleBackToJobs} variant="outline">
            ← Back to Job Matches
          </Button>
          <div className="text-gray-600">
            Selected: {selectedJob.title}
          </div>
        </div>

        <div className="space-y-8">
          <ResumePreview resume={resumes.corporate} variant="corporate" />
          <ResumePreview resume={resumes.technical} variant="technical" />
          <ResumePreview resume={resumes.management} variant="management" />
        </div>
      </div>
    );
  }

  const hasNoMatches = !matchingJobs.length && !alternativeJobs.length;

  if (hasNoMatches) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">No Direct Matches Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any exact matches for your profile. Try exploring related careers on O*NET.
          </p>
          <Button
            onClick={handleViewONET}
            variant="outline"
            className="w-full md:w-auto"
          >
            Search on O*NET
          </Button>
        </div>
      </div>
    );
  }

  const jobsToDisplay = matchingJobs.length ? matchingJobs : alternativeJobs;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {matchingJobs.length ? 'Matching Civilian Careers' : 'Alternative Career Paths'}
        </h3>
        <Button
          onClick={handleViewONET}
          variant="outline"
          className="text-indigo-600 hover:text-indigo-700"
        >
          View on O*NET
        </Button>
      </div>

      <p className="text-gray-600">
        Based on your military experience as {militaryInfo.rank} - {militaryInfo.jobTitle}, 
        we've found these {matchingJobs.length ? 'matching' : 'alternative'} civilian careers.
        Select a position to generate tailored resumes.
      </p>

      <div className="space-y-4">
        {jobsToDisplay.map((job, index) => (
          <div key={`${job.code}-${index}`} className="relative">
            <JobCard
              job={job}
              index={index}
              onSelect={() => handleJobSelection(job)}
              disabled={false}
            />
            <Button
              onClick={() => handleJobSelection(job)}
              className="absolute top-4 right-4"
            >
              Generate Resumes
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}