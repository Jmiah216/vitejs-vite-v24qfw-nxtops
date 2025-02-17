import React from 'react';
import { Education } from '../../types';
import { Button } from '../ui/button';
import { degrees } from '../../lib/constants';

interface Props {
  value: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationForm({ value, onChange }: Props) {
  const handleAdd = () => {
    onChange([
      ...value,
      {
        type: 'College',
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, field: keyof Education, fieldValue: string) => {
    onChange(
      value.map((edu, i) => 
        i === index ? { ...edu, [field]: fieldValue } : edu
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button
          type="button"
          onClick={handleAdd}
          variant="outline"
        >
          Add Education
        </Button>
      </div>

      {value.map((education, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={education.type}
                onChange={(e) => handleUpdate(index, 'type', e.target.value as Education['type'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
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
                onChange={(e) => handleUpdate(index, 'school', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            {education.type !== 'High School' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <select
                    value={education.degree}
                    onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Degree</option>
                    {degrees.map(degree => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                  <input
                    type="text"
                    value={education.field}
                    onChange={(e) => handleUpdate(index, 'field', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={education.startDate}
                onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="month"
                value={education.endDate}
                onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => handleRemove(index)}
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              Remove Education
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}