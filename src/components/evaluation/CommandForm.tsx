import React, { useEffect, useState } from 'react';
import { Command } from '../../types';
import { Button } from '../ui/button';
import { militaryJobs } from '../../lib/constants/militaryJobs';
import { ResponsibilityInput } from './ResponsibilityInput';

interface Props {
  value: Command;
  onChange: (command: Command) => void;
  onRemove?: () => void;
  label: string;
  branch: string;
}

export function CommandForm({ value, onChange, onRemove, label, branch }: Props) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [availableJobs, setAvailableJobs] = useState<string[]>([]);

  useEffect(() => {
    if (branch) {
      setAvailableJobs(militaryJobs[branch] || []);
      // Reset job title if it's not in the new branch's job list
      if (value.jobTitle && !militaryJobs[branch]?.includes(value.jobTitle)) {
        onChange({ ...value, jobTitle: '' });
      }
    }
  }, [branch]);

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'custom') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      onChange({ ...value, jobTitle: selectedValue });
    }
  };

  const handleCustomJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, jobTitle: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">{label}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Command Name</label>
          <input
            type="text"
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title/MOS</label>
          {showCustomInput ? (
            <div className="mt-1 space-y-2">
              <input
                type="text"
                value={value.jobTitle}
                onChange={handleCustomJobTitle}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter custom job title"
              />
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to list
              </button>
            </div>
          ) : (
            <select
              value={value.jobTitle}
              onChange={handleJobTitleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Job Title/MOS</option>
              {availableJobs.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
              <option value="custom">Enter Custom Job Title</option>
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="month"
            value={value.startDate}
            onChange={(e) => onChange({ ...value, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="month"
            value={value.endDate}
            onChange={(e) => onChange({ ...value, endDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
        <ResponsibilityInput
          onAdd={(responsibility) => 
            onChange({
              ...value,
              responsibilities: [...value.responsibilities, responsibility]
            })
          }
          responsibilities={value.responsibilities}
          onRemove={(index) =>
            onChange({
              ...value,
              responsibilities: value.responsibilities.filter((_, i) => i !== index)
            })
          }
        />
      </div>

      {onRemove && (
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={onRemove}
            variant="outline"
            className="text-red-600 hover:text-red-700"
          >
            Remove Command
          </Button>
        </div>
      )}
    </div>
  );
}