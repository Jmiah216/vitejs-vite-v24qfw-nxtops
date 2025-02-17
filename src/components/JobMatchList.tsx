import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { Button } from './ui/button';
import { findMatchingJobs } from '../lib/careerMatching';

interface Props {
  militaryInfo: any;
  onBack: () => void;
}

export function JobMatchList({ militaryInfo, onBack }: Props) {
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        const jobMatches = await findMatchingJobs(militaryInfo);
        setMatches(jobMatches);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job matches');
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, [militaryInfo]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-military-accent"></div>
        <span className="ml-3 text-military-dark font-medium">Finding your best career matches...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={onBack}>Return to Profile</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-military-dark rounded-lg p-6 text-white mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Mission: Career Match</h2>
            <p className="text-military-light mt-2">
              Based on your {militaryInfo.branch} experience as {militaryInfo.rank}, 
              we've identified these civilian IT positions that align with your skills and expertise.
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="text-white border-white hover:bg-military-accent"
          >
            ← Back to Profile
          </Button>
        </div>
      </div>

      {/* Selection Counter */}
      <div className="bg-military-lightest p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="text-military-dark font-medium">
            Selected Positions: {selectedJobs.length}/3
          </span>
          <span className="text-military-accent">
            Select up to 3 positions to generate tailored resumes
          </span>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {matches.map((job) => (
          <div
            key={job.code}
            className={`bg-white rounded-lg shadow-lg p-6 border-l-4 transition-all ${
              selectedJobs.some(j => j.code === job.code)
                ? 'border-military-accent'
                : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-military-dark">{job.title}</h3>
                <div className="mt-1">
                  <span className="inline-block bg-military-lightest text-military-dark px-3 py-1 rounded-full text-sm">
                    {job.matchScore}% Match
                  </span>
                </div>
              </div>
              <Button
                onClick={() => handleJobToggle(job)}
                variant={selectedJobs.some(j => j.code === job.code) ? 'default' : 'outline'}
                className="bg-military-accent hover:bg-military-accent-dark"
                disabled={selectedJobs.length >= 3 && !selectedJobs.some(j => j.code === job.code)}
              >
                {selectedJobs.some(j => j.code === job.code) ? 'Selected' : 'Select'}
              </Button>
            </div>

            <p className="mt-4 text-gray-600">{job.description}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-military-dark mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-military-lightest text-military-dark px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-military-dark mb-2">Certifications</h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Entry Level:</span> {job.certifications.novice.join(', ')}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Advanced:</span> {job.certifications.expert.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-military-lightest p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-military-dark mb-1">Salary Range</h4>
                  <p className="text-military-dark">{job.salary.median} median</p>
                  <p className="text-sm text-gray-600">Range: {job.salary.range}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-military-dark mb-1">Career Outlook</h4>
                  <p className="text-military-accent">{job.outlook}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="text-military-dark border-military-dark hover:bg-military-lightest"
        >
          Back
        </Button>
        <Button
          onClick={() => {/* Handle resume generation */}}
          disabled={selectedJobs.length === 0}
          className="bg-military-accent hover:bg-military-accent-dark text-white"
        >
          Generate Resumes
        </Button>
      </div>
    </div>
  );
}