import React, { useState } from 'react';
import { Command } from '../../../types';
import { militaryJobs } from '../../../lib/constants';
import { translateMilitaryJobTitle } from '../../../lib/utils/militaryTranslator';

interface Props {
  value: Command;
  onChange: (command: Command) => void;
  branch: string;
}

export function JobTitleInput({ value, onChange, branch }: Props) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [civilianTitle, setCivilianTitle] = useState('');

  const availableJobs = branch ? militaryJobs[branch as keyof typeof militaryJobs] || [] : [];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    
    if (selectedValue === 'custom') {
      setShowCustomInput(true);
      setCustomTitle('');
      onChange({ ...value, jobTitle: '' });
      setCivilianTitle('');
    } else if (selectedValue === 'blank') {
      setShowCustomInput(false);
      setCustomTitle('');
      onChange({ ...value, jobTitle: '' });
      setCivilianTitle('');
    } else {
      setShowCustomInput(false);
      setCustomTitle('');
      const newCivilianTitle = translateMilitaryJobTitle(selectedValue);
      setCivilianTitle(newCivilianTitle);
      onChange({ ...value, jobTitle: selectedValue });
    }
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCustomTitle(inputValue);
    const newCivilianTitle = translateMilitaryJobTitle(inputValue);
    setCivilianTitle(newCivilianTitle);
    onChange({ ...value, jobTitle: inputValue });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Job Title/MOS
      </label>
      
      <div className="space-y-2">
        <select
          value={showCustomInput ? 'custom' : value.jobTitle || 'blank'}
          onChange={handleSelectChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
          disabled={!branch}
        >
          <option value="blank">Select Job Title/MOS</option>
          {availableJobs.map(job => (
            <option key={job} value={job}>
              {job}
            </option>
          ))}
          <option value="custom">Enter Custom Job Title/MOS</option>
        </select>

        {showCustomInput && (
          <div className="space-y-2">
            <input
              type="text"
              value={customTitle}
              onChange={handleCustomInput}
              placeholder="Enter your Job Title/MOS"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => {
                setShowCustomInput(false);
                setCustomTitle('');
                onChange({ ...value, jobTitle: '' });
                setCivilianTitle('');
              }}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Back to List
            </button>
          </div>
        )}

        {civilianTitle && (
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              Civilian Title: {civilianTitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}