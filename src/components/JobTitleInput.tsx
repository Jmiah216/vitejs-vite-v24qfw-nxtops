import React, { useState } from 'react';
import { militaryJobs } from '../lib/militaryData';

interface Props {
  branch: string;
  value: string;
  onChange: (value: string) => void;
}

export function JobTitleInput({ branch, value, onChange }: Props) {
  const [isCustom, setIsCustom] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      onChange(selectedValue);
    }
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Job Title/MOS
      </label>
      {!isCustom ? (
        <select
          value={value || ''}
          onChange={handleSelectChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
          disabled={!branch}
        >
          <option value="">Select Job Title/MOS</option>
          {branch && militaryJobs[branch as keyof typeof militaryJobs]?.map(job => (
            <option key={job} value={job}>
              {job}
            </option>
          ))}
          <option value="custom">Enter Custom Job Title/MOS</option>
        </select>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={handleCustomInput}
            placeholder="Enter your Job Title/MOS"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => setIsCustom(false)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
}