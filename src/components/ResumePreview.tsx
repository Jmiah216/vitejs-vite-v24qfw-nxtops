import React from 'react';
import { Button } from './ui/button';
import { CareerAssessment } from '../types';
import { generateResumes } from '../lib/resumeGeneration/generator';

interface Props {
  assessment: CareerAssessment;
  onBack?: () => void;
}

export function ResumePreview({ assessment, onBack }: Props) {
  // Ensure selectedJobs exists with a default empty array
  const selectedJobs = assessment.selectedJobs || [];
  const resumes = generateResumes(assessment, selectedJobs);

  return (
    <div className="space-y-6">
      {/* Navigation */}
      {onBack && (
        <div className="flex justify-between items-center">
          <Button onClick={onBack} variant="outline">
            ← Back
          </Button>
          <span className="text-gray-600">
            Selected Careers: {selectedJobs.length}
          </span>
        </div>
      )}

      {/* Resume Variants */}
      <div className="space-y-8">
        {Object.entries(resumes).map(([variant, resume]) => (
          <div key={variant} className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center capitalize">
              {variant} Resume
            </h2>

            {/* Personal Information */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">{resume.personalInfo.name}</h1>
              <div className="text-gray-600">
                {resume.personalInfo.email && (
                  <span className="mx-2">{resume.personalInfo.email}</span>
                )}
                {resume.personalInfo.phone && (
                  <span className="mx-2">{resume.personalInfo.phone}</span>
                )}
                {resume.personalInfo.location && (
                  <span className="mx-2">{resume.personalInfo.location}</span>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Selected Careers */}
            {selectedJobs.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Target Positions</h2>
                <div className="space-y-4">
                  {selectedJobs.map((job, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{job.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}