import React from 'react';
import { Command } from '../../../types';

interface Props {
  value: Command;
  onChange: (command: Command) => void;
}

export function DateRangeInputs({ value, onChange }: Props) {
  return (
    <>
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
    </>
  );
}