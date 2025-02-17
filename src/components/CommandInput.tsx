import React, { useState } from 'react';
import { Command } from '../types';
import { Button } from './ui/button';
import { JobTitleInput } from './JobTitleInput';
import { ResponsibilityInput } from './ResponsibilityInput';
import { ItemList } from './ItemList';

interface Props {
  command: Command;
  branch: string;
  onChange: (field: keyof Command, value: string | string[]) => void;
  onAdd: () => void;
  onRemove?: () => void;
}

export function CommandInput({ command, branch, onChange, onAdd, onRemove }: Props) {
  const handleResponsibilityAdd = (responsibility: string) => {
    onChange('responsibilities', [...(command.responsibilities || []), responsibility]);
  };

  const handleResponsibilityRemove = (index: number) => {
    onChange('responsibilities', (command.responsibilities || []).filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Command/Unit</label>
          <input
            type="text"
            value={command.unit}
            onChange={(e) => onChange('unit', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <JobTitleInput
          branch={branch}
          value={command.jobTitle}
          onChange={(value) => onChange('jobTitle', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="month"
            value={command.startDate}
            onChange={(e) => onChange('startDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="month"
            value={command.endDate}
            onChange={(e) => onChange('endDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Responsibilities Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Responsibilities</h4>
        <ResponsibilityInput
          onAdd={handleResponsibilityAdd}
          placeholder="Enter each responsibility individually"
        />
        <ItemList
          items={command.responsibilities || []}
          onRemove={handleResponsibilityRemove}
          emptyMessage="No responsibilities added yet"
        />
      </div>

      <div className="flex justify-end space-x-2">
        {onRemove && (
          <Button
            type="button"
            variant="outline"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700"
          >
            Remove
          </Button>
        )}
        <Button
          type="button"
          onClick={onAdd}
          disabled={!command.unit || !command.jobTitle || !command.startDate || !command.endDate}
        >
          Add Command
        </Button>
      </div>
    </div>
  );
}