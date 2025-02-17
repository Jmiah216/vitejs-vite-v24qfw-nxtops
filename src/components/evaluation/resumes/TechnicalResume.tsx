import React from 'react';
import { PersonalInfo, MilitaryService, Education, Job } from '../../../types';
import { formatDateRange } from '../../../lib/utils/dateUtils';
import { generateTechnicalSummary } from '../../../lib/resumeGeneration/templates/technical';

interface Props {
  personalInfo: PersonalInfo;
  militaryService: MilitaryService;
  education: Education[];
  skills: string[];
  selectedJobs: Job[];
}

export function TechnicalResume({ personalInfo, militaryService, education, skills, selectedJobs }: Props) {
  const summary = generateTechnicalSummary(militaryService, selectedJobs);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <div className="text-gray-600 mt-2">
          <p>{personalInfo.email} • {personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
          Professional Summary
        </h2>
        <p className="text-gray-700">{summary}</p>
      </div>

      {/* Technical Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
          Technical Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Professional Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
          Professional Experience
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{militaryService.primaryCommand.jobTitle}</h3>
            <p className="text-gray-600">{militaryService.branch}</p>
            <p className="text-sm text-gray-500">
              {formatDateRange(
                militaryService.primaryCommand.startDate,
                militaryService.primaryCommand.endDate
              )}
            </p>
            <ul className="list-disc list-inside mt-2">
              {militaryService.primaryCommand.responsibilities.map((resp, index) => (
                <li key={index} className="text-gray-700">{resp}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p className="font-medium">{edu.school}</p>
              {edu.degree && <p>{edu.degree} in {edu.field}</p>}
              <p className="text-sm text-gray-600">
                {formatDateRange(edu.startDate, edu.endDate)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}