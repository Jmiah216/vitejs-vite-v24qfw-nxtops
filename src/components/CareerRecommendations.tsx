import React, { useState, useEffect } from 'react';
import { CareerAssessment, Job } from '../types';
import { findMatchingJobs, filterJobsByPreferences, findAlternativeMatches } from '../lib/careerMatching';
import { Button } from './ui/button';
import { getMOCCrosswalkURL } from '../lib/onet';
import { ResumePreview } from './ResumePreview';

interface Props {
  assessment: CareerAssessment;
  militaryBranch?: string;
  mosCode?: string;
}

export function CareerRecommendations({ assessment, militaryBranch, mosCode }: Props) {
  const [recommendations, setRecommendations] = useState<Job[]>([]);
  const [alternativeMatches, setAlternativeMatches] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function loadRecommendations() {
      if (!assessment) return;

      try {
        setLoading(true);
        setError(null);

        const jobs = await findMatchingJobs(assessment, militaryBranch, mosCode);
        const filteredJobs = filterJobsByPreferences(jobs, assessment);
        
        if (mounted) {
          setRecommendations(filteredJobs);
          
          if (filteredJobs.length === 0 || filteredJobs.every(job => (job.matchScore || 0) < 40)) {
            const alternatives = await findAlternativeMatches(assessment, assessment.selectedSkills || []);
            setAlternativeMatches(alternatives);
          }
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load career recommendations';
          setError(errorMessage);
          console.error('Error loading recommendations:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadRecommendations();

    return () => {
      mounted = false;
    };
  }, [assessment, militaryBranch, mosCode, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleViewONET = () => {
    window.open(getMOCCrosswalkURL(), '_blank');
  };

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          <span>Finding your best career matches...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-x-4">
            <Button onClick={handleRetry}>Try Again</Button>
            <Button variant="outline" onClick={handleViewONET}>
              Search on O*NET
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations.length && !alternativeMatches.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">No Direct Matches Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any exact matches for your profile. Consider exploring related careers on O*NET or adjusting your preferences.
          </p>
          <Button
            onClick={handleViewONET}
            variant="outline"
            className="w-full md:w-auto"
          >
            Explore Careers on O*NET
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {recommendations.map((job, index) => (
        <div key={`${job.code}-${index}`} className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
              {job.matchScore}% Match
            </span>
          </div>
          
          <p className="text-gray-600 mt-2">{job.description}</p>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill, i) => (
                <span 
                  key={`${skill}-${i}`}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Certifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">Entry Level:</p>
                <ul className="list-disc list-inside">
                  {job.certifications?.novice.map((cert, i) => (
                    <li key={i}>{cert}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium">Intermediate:</p>
                <ul className="list-disc list-inside">
                  {job.certifications?.intermediate.map((cert, i) => (
                    <li key={i}>{cert}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium">Expert:</p>
                <ul className="list-disc list-inside">
                  {job.certifications?.expert.map((cert, i) => (
                    <li key={i}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {job.salary && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Salary Information</h4>
                  <p className="text-gray-600">Median: {job.salary.median}</p>
                  <p className="text-gray-600">Range: {job.salary.range}</p>
                </div>
                {job.outlook && (
                  <div>
                    <h4 className="font-medium text-gray-900">Job Outlook</h4>
                    <p className="text-gray-600">{job.outlook}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}