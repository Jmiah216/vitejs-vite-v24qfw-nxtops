import React, { useState } from 'react';
import { Button } from './ui/button';
import { Education } from '../types';
import { degrees, studyFields } from '../lib/militaryData';

interface Props {
  onAdd: (education: Education) => void;
  onRemove: (index: number) => void;
  educationList: Education[];
}

export function EducationSection({ onAdd, onRemove, educationList }: Props) {
  const [education, setEducation] = useState<Education>({
    type: 'College',
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const handleAdd = () => {
    if (education.school && education.startDate && education.endDate) {
      onAdd(education);
      setEducation({
        type: 'College',
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Education</h3>

      {/* Existing Education List */}
      {educationList.length > 0 && (
        <div className="space-y-4">
          {educationList.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{edu.type}</h4>
                  <p>{edu.school}</p>
                  {edu.degree && <p>{edu.degree} in {edu.field}</p>}
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Education Form */}
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={education.type}
              onChange={(e) => setEducation(prev => ({ ...prev, type: e.target.value as Education['type'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="College">College</option>
              <option value="High School">High School</option>
              <option value="Vocational">Vocational</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">School Name</label>
            <input
              type="text"
              value={education.school}
              onChange={(e) => setEducation(prev => ({ ...prev, school: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {education.type !== 'High School' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <select
                value={education.degree}
                onChange={(e) => setEducation(prev => ({ ...prev, degree: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Degree</option>
                {Object.entries(degrees).map(([category, degreeList]) => (
                  <optgroup key={category} label={category}>
                    {degreeList.map(degree => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <select
                value={education.field}
                onChange={(e) => setEducation(prev => ({ ...prev, field: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Field</option>
                {studyFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="month"
              value={education.startDate}
              onChange={(e) => setEducation(prev => ({ ...prev, startDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="month"
              value={education.endDate}
              onChange={(e) => setEducation(prev => ({ ...prev, endDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">GPA (optional)</label>
            <input
              type="text"
              value={education.gpa}
              onChange={(e) => setEducation(prev => ({ ...prev, gpa: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleAdd}
            disabled={!education.school || !education.startDate || !education.endDate}
          >
            Add Education
          </Button>
        </div>
      </div>
    </div>
  );
}