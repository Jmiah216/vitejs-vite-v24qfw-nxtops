import React from 'react';
import { Command } from '../../../types';

interface Props {
  value: Command;
  onChange: (command: Command) => void;
  onBack: () => void;
}

export function CustomJobInput({ value, onChange, onBack }: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Custom Job Title/MOS</label>
      <input
        type="text"
        value={value.jobTitle}
        onChange={(e) => onChange({ ...value, jobTitle: e.target.value })}
        placeholder="Enter your Job Title/MOS"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-indigo-600 hover:text-indigo-500"
      >
        Back to List
      </button>
    </div>
  );
}