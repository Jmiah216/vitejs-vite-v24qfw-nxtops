import React from 'react';
import { MilitaryEvaluation, Job } from '../types';
import { findITJobMatches } from '../lib/jobMatching';
import { Button } from './ui/button';

interface Props {
  evaluation: MilitaryEvaluation;
  onJobSelect: (jobs: Job[]) => void;
}

export function JobMatches({ evaluation, onJobSelect }: Props) {
  const [matches, setMatches] = React.useState<Awaited<ReturnType<typeof findITJobMatches>>>([]);
  const [selectedJobs, setSelectedJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        setError(null);
        const results = await findITJobMatches(evaluation);
        setMatches(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job matches');
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, [evaluation]);

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

  const handleSubmit = () => {
    if (selectedJobs.length > 0) {
      onJobSelect(selectedJobs);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Finding best IT job matches...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Matching IT Careers</h2>
        <span className="text-sm text-gray-600">
          Selected: {selectedJobs.length}/3
        </span>
      </div>

      <div className="space-y-4">
        {matches.map(({ job, score, matchedSkills, relevantExperience }) => (
          <div
            key={job.code}
            className={`border rounded-lg p-4 transition-colors ${
              selectedJobs.some(j => j.code === job.code)
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200'
            }`}
            onClick={() => handleJobToggle(job)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="text-sm text-gray-500">Match Score: {score}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Median Salary: {job.salary.median}</p>
                <p className="text-sm text-gray-600">Range: {job.salary.range}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Matched Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {matchedSkills.map((skill, index) => (
                    <span
                      key={index}
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
                  {relevantExperience.slice(0, 3).map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>
            </div>

            {job.outlook && (
              <div className="mt-4 bg-gray-50 p-3 rounded">
                <h4 className="font-medium text-sm">Job Outlook</h4>
                <p className="text-sm text-gray-600">{job.outlook}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={selectedJobs.length === 0}
        >
          Create Resume with Selected Jobs
        </Button>
      </div>
    </div>
  );
}