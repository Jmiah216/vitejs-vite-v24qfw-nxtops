import React, { useState } from 'react';
import { Command } from '../../../types';
import { militaryJobs } from '../../../lib/constants';
import { CustomJobInput } from './CustomJobInput';

interface Props {
  value: Command;
  onChange: (command: Command) => void;
  branch: string;
}

export function JobTitleSelect({ value, onChange, branch }: Props) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const availableJobs = branch ? militaryJobs[branch as keyof typeof militaryJobs] || [] : [];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'custom') {
      setShowCustomInput(true);
      onChange({ ...value, jobTitle: '' });
    } else {
      onChange({ ...value, jobTitle: selectedValue });
    }
  };

  if (showCustomInput) {
    return (
      <CustomJobInput
        value={value}
        onChange={onChange}
        onBack={() => {
          setShowCustomInput(false);
          onChange({ ...value, jobTitle: '' });
        }}
      />
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Job Title/MOS</label>
      <select
        value={value.jobTitle || ''}
        onChange={handleSelectChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required
        disabled={!branch}
      >
        <option value="">Select Job Title/MOS</option>
        {availableJobs.map(job => (
          <option key={job} value={job}>{job}</option>
        ))}
        <option value="custom">Enter Custom Job Title/MOS</option>
      </select>
    </div>
  );
}