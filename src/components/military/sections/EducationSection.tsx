import { useState } from 'react';
import { Button } from '../../ui/button';
import { Education } from '../../../types/military';

interface Props {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationSection({ education, onChange }: Props) {
  const [newEducation, setNewEducation] = useState<Education>({
    level: 'High School Diploma or Equivalent',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    fieldOfStudy: ''
  });

  const educationLevels = [
    'High School Diploma or Equivalent',
    'Some College, No Degree',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate or Professional Degree'
  ] as const;

  const handleAdd = () => {
    onChange([...education, newEducation]);
    setNewEducation({
      level: 'High School Diploma or Equivalent',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      fieldOfStudy: ''
    });
  };

  const handleRemove = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Education Background</h2>

      {education.map((edu, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Education Level</label>
              <select
                value={edu.level}
                onChange={(e) => {
                  const updated = [...education];
                  updated[index].level = e.target.value as Education['level'];
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Institution Name</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => {
                  const updated = [...education];
                  updated[index].institution = e.target.value;
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => {
                  const updated = [...education];
                  updated[index].location = e.target.value;
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => {
                  const updated = [...education];
                  updated[index].startDate = e.target.value;
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => {
                  const updated = [...education];
                  updated[index].endDate = e.target.value;
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {edu.level !== 'High School Diploma or Equivalent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                <input
                  type="text"
                  value={edu.fieldOfStudy || ''}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[index].fieldOfStudy = e.target.value;
                    onChange(updated);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => handleRemove(index)}
            className="text-red-600 hover:text-red-700"
          >
            Remove Education
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAdd}
        className="w-full"
      >
        Add Education
      </Button>
    </div>
  );
}