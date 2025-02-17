import React from 'react';
import { Command } from '../../../types';
import { CommandNameInput } from './CommandNameInput';
import { JobTitleSelect } from './JobTitleSelect';
import { DateRangeInputs } from './DateRangeInputs';
import { ResponsibilitiesSection } from './ResponsibilitiesSection';
import { RemoveCommandButton } from './RemoveCommandButton';

interface Props {
  value: Command;
  onChange: (command: Command) => void;
  onRemove?: () => void;
  branch: string;
}

export function CommandForm({ value, onChange, onRemove, branch }: Props) {
  const handleCommandNameChange = (name: string) => {
    onChange({ ...value, name });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <CommandNameInput 
          value={value.name}
          onChange={handleCommandNameChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JobTitleSelect
            value={value}
            onChange={onChange}
            branch={branch}
          />
          <DateRangeInputs
            value={value}
            onChange={onChange}
          />
        </div>
      </div>

      <ResponsibilitiesSection
        value={value}
        onChange={onChange}
      />

      {onRemove && <RemoveCommandButton onRemove={onRemove} />}
    </div>
  );
}