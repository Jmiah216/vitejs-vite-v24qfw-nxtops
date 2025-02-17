import React from 'react';
import { militaryBranches } from '../../lib/constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function BranchSelect({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Branch</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required
      >
        <option value="">Select Branch</option>
        {militaryBranches.map(branch => (
          <option key={branch} value={branch}>{branch}</option>
        ))}
      </select>
    </div>
  );
}