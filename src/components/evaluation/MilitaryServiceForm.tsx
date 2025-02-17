import React from 'react';
import { MilitaryService } from '../../types';
import { CommandForm } from './command/CommandForm';
import { BranchSelect } from './BranchSelect';
import { RankSelect } from './RankSelect';
import { Button } from '../ui/button';

interface Props {
  value: MilitaryService;
  onChange: (service: MilitaryService) => void;
}

export function MilitaryServiceForm({ value, onChange }: Props) {
  const handleChange = (field: keyof MilitaryService, fieldValue: any) => {
    onChange({
      ...value,
      [field]: fieldValue
    });
  };

  const handleAddCommand = () => {
    handleChange('additionalCommands', [
      ...value.additionalCommands,
      {
        name: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        responsibilities: []
      }
    ]);
  };

  const handleRemoveCommand = (index: number) => {
    handleChange('additionalCommands', 
      value.additionalCommands.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Military Service</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BranchSelect
          value={value.branch}
          onChange={(branch) => handleChange('branch', branch)}
        />
        <RankSelect
          branch={value.branch}
          value={value.rank}
          onChange={(rank) => handleChange('rank', rank)}
        />
      </div>

      <CommandForm
        value={value.primaryCommand}
        onChange={(command) => handleChange('primaryCommand', command)}
        branch={value.branch}
      />

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium">Additional Commands</h4>
          <Button
            type="button"
            onClick={handleAddCommand}
            variant="outline"
          >
            Add Command
          </Button>
        </div>

        <div className="space-y-6">
          {value.additionalCommands.map((command, index) => (
            <div key={index} className="border rounded-lg p-4">
              <CommandForm
                value={command}
                onChange={(updated) => {
                  const newCommands = [...value.additionalCommands];
                  newCommands[index] = updated;
                  handleChange('additionalCommands', newCommands);
                }}
                onRemove={() => handleRemoveCommand(index)}
                branch={value.branch}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}