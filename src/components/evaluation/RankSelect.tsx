import React from 'react';
import { militaryRanks } from '../../lib/constants/ranks';

interface Props {
  branch: string;
  value: string;
  onChange: (value: string) => void;
}

export function RankSelect({ branch, value, onChange }: Props) {
  const ranks = branch ? militaryRanks[branch] || [] : [];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Rank</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required
        disabled={!branch}
      >
        <option value="">Select Rank</option>
        {ranks.map(rank => (
          <option key={rank.id} value={rank.rank}>
            {rank.rank} ({rank.grade})
          </option>
        ))}
      </select>
    </div>
  );
}