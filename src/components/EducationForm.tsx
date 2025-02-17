import React, { useState } from 'react';
import { Button } from './ui/button';
import type { Education } from '../types';

interface Props {
  onEducationSubmit: (education: Education[]) => void;
}

export function EducationForm({ onEducationSubmit }: Props) {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    type: 'College',
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const handleInputChange = (field: keyof Education, value: string) => {
    setCurrentEducation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddEducation = () => {
    if (currentEducation.school && currentEducation.startDate && currentEducation.endDate) {
      setEducationList(prev => [...prev, currentEducation]);
      setCurrentEducation({
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

  const handleSubmit = () => {
    onEducationSubmit(educationList);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Education History</h3>

      {/* Education List */}
      {educationList.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Added Education</h4>
          {educationList.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{edu.type}</p>
              <p>{edu.school}</p>
              {edu.degree && <p>{edu.degree} in {edu.field}</p>}
              <p className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Education Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={currentEducation.type}
            onChange={(e) => handleInputChange('type', e.target.value as Education['type'])}
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
            value={currentEducation.school}
            onChange={(e) => handleInputChange('school', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {currentEducation.type !== 'High School' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={currentEducation.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input
                type="text"
                value={currentEducation.field}
                onChange={(e) => handleInputChange('field', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="month"
              value={currentEducation.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="month"
              value={currentEducation.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GPA (optional)</label>
          <input
            type="text"
            value={currentEducation.gpa}
            onChange={(e) => handleInputChange('gpa', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddEducation}
            disabled={!currentEducation.school || !currentEducation.startDate || !currentEducation.endDate}
          >
            Add Education
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={educationList.length === 0}
          >
            Save Education History
          </Button>
        </div>
      </div>
    </div>
  );
}