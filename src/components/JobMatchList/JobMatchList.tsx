import React, { useState } from 'react';
import { Job } from '../../types';
import { JobMatch } from '../../lib/jobMatching';
import { Button } from '../ui/button';

interface Props {
  matches: JobMatch[];
  onSelect: (jobs: Job[]) => void;
  onBack: () => void;
}

export function JobMatchList({ matches, onSelect, onBack }: Props) {
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline">
            ← Back
          </Button>
          <h2 className="text-xl font-semibold">Best Matching IT Careers</h2>
        </div>
        <span className="text-sm text-gray-600">
          Selected: {selectedJobs.length}/3
        </span>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">No Matching Jobs Found</h3>
          <p className="mt-2 text-gray-600">
            Try adjusting your skills or experience to find better matches.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {matches.map(({ job, score, matchedSkills, relevantExperience }) => (
              <div
                key={job.code}
                className={`border rounded-lg p-4 ${
                  selectedJobs.some(j => j.code === job.code)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-500">Match Score: {score}%</p>
                  </div>
                  <Button
                    onClick={() => handleJobToggle(job)}
                    disabled={selectedJobs.length >= 3 && !selectedJobs.some(j => j.code === job.code)}
                  >
                    {selectedJobs.some(j => j.code === job.code) ? 'Selected' : 'Select'}
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Matched Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {matchedSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Relevant Experience</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {relevantExperience.slice(0, 3).map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>Salary Range: {job.salary.range}</p>
                  <p>Job Outlook: {job.outlook}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => onSelect(selectedJobs)}
              disabled={selectedJobs.length === 0}
            >
              Continue with Selected Jobs
            </Button>
          </div>
        </>
      )}
    </div>
  );
}