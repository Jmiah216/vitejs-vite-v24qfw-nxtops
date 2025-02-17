import React from 'react';
import { PersonalInfo, MilitaryService, Education, Job } from '../../../types';
import { formatDateRange } from '../../../lib/utils/dateUtils';
import { generateCorporateSummary } from '../../../lib/resumeGeneration/templates/corporate';

interface Props {
  personalInfo: PersonalInfo;
  militaryService: MilitaryService;
  education: Education[];
  skills: string[];
  selectedJobs: Job[];
}

export function CorporateResume({ personalInfo, militaryService, education, skills, selectedJobs }: Props) {
  const summary = generateCorporateSummary(militaryService, selectedJobs);

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
          Professional Profile
        </h2>
        <p className="text-gray-700">{summary}</p>
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
              {militaryService.primaryCommand.responsibilities
                .filter(resp => resp.toLowerCase().includes('business') || 
                              resp.toLowerCase().includes('project') || 
                              resp.toLowerCase().includes('coordinate'))
                .map((resp, index) => (
                  <li key={index} className="text-gray-700">{resp}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Skills & Expertise */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Business Skills</h3>
            <ul className="list-disc list-inside">
              {skills
                .filter(skill => 
                  skill.toLowerCase().includes('business') || 
                  skill.toLowerCase().includes('communication') ||
                  skill.toLowerCase().includes('project'))
                .map((skill, index) => (
                  <li key={index} className="text-gray-700">{skill}</li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Technical Skills</h3>
            <ul className="list-disc list-inside">
              {skills
                .filter(skill => 
                  skill.toLowerCase().includes('technical') || 
                  skill.toLowerCase().includes('system') ||
                  skill.toLowerCase().includes('software'))
                .map((skill, index) => (
                  <li key={index} className="text-gray-700">{skill}</li>
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