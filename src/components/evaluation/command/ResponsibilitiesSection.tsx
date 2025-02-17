import React from 'react';
import { Command } from '../../../types';
import { ResponsibilityInput } from '../ResponsibilityInput';

interface Props {
  value: Command;
  onChange: (command: Command) => void;
}

export function ResponsibilitiesSection({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Responsibilities
      </label>
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
  );
}