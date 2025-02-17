import React, { useState } from 'react';
import { Button } from './ui/button';
import { LocationInput } from './LocationInput';
import { ResponsibilityInput } from './ResponsibilityInput';
import { ItemList } from './ItemList';
import { translateMilitaryToCivilian } from '../lib/militaryToCareer';

interface WorkExperience {
  jobTitle: string;
  unit: string;
  location: {
    city: string;
    state: string;
  };
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Props {
  onAdd: (experience: WorkExperience) => void;
  onRemove: (index: number) => void;
  experiences: WorkExperience[];
}

export function WorkExperienceInput({ onAdd, onRemove, experiences }: Props) {
  const [experience, setExperience] = useState<WorkExperience>({
    jobTitle: '',
    unit: '',
    location: {
      city: '',
      state: ''
    },
    startDate: '',
    endDate: '',
    responsibilities: []
  });

  const handleLocationChange = (city: string, state: string) => {
    setExperience(prev => ({
      ...prev,
      location: { city, state }
    }));
  };

  const handleResponsibilityAdd = (responsibility: string) => {
    // Translate military responsibility to civilian language
    const civilianResponsibility = translateMilitaryToCivilian(responsibility);
    setExperience(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, civilianResponsibility]
    }));
  };

  const handleResponsibilityRemove = (index: number) => {
    setExperience(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const handleAdd = () => {
    if (experience.jobTitle && experience.unit && experience.startDate && experience.endDate) {
      onAdd(experience);
      setExperience({
        jobTitle: '',
        unit: '',
        location: { city: '', state: '' },
        startDate: '',
        endDate: '',
        responsibilities: []
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Display existing experiences */}
      {experiences.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Added Work Experience</h4>
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{exp.jobTitle}</p>
                  <p>{exp.unit}</p>
                  <p className="text-sm text-gray-600">
                    {exp.location.city}, {exp.location.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  type="button"
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

      {/* Add new experience form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={experience.jobTitle}
            onChange={(e) => setExperience(prev => ({ ...prev, jobTitle: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Unit/Command</label>
          <input
            type="text"
            value={experience.unit}
            onChange={(e) => setExperience(prev => ({ ...prev, unit: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <LocationInput
          city={experience.location.city}
          state={experience.location.state}
          onChange={handleLocationChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="month"
              value={experience.startDate}
              onChange={(e) => setExperience(prev => ({ ...prev, startDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="month"
              value={experience.endDate}
              onChange={(e) => setExperience(prev => ({ ...prev, endDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Responsibilities
          </label>
          <ResponsibilityInput
            onAdd={handleResponsibilityAdd}
            placeholder="Enter each responsibility individually"
          />
          <ItemList
            items={experience.responsibilities}
            onRemove={handleResponsibilityRemove}
            emptyMessage="No responsibilities added yet"
          />
        </div>

        <Button
          type="button"
          onClick={handleAdd}
          disabled={!experience.jobTitle || !experience.unit || !experience.startDate || !experience.endDate}
        >
          Add Work Experience
        </Button>
      </div>
    </div>
  );
}