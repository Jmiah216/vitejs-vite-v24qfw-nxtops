import { useState } from 'react';
import { Button } from '../../ui/button';
import { militaryBranches, militaryJobs } from '../../../lib/constants';
import { MilitaryInfo, Command } from '../../../types/military';

interface Props {
  value: Partial<MilitaryInfo>;
  onChange: (updates: Partial<MilitaryInfo>) => void;
}

const emptyCommand: Command = {
  unit: '',
  jobTitle: '',
  startDate: '',
  endDate: '',
  responsibilities: []
};

export function MilitaryHistorySection({ value, onChange }: Props) {
  const [customJob, setCustomJob] = useState(false);
  const [newResponsibility, setNewResponsibility] = useState('');

  const handleAddCommand = () => {
    onChange({ 
      commands: [...(value.commands || []), { ...emptyCommand }]
    });
  };

  const handleRemoveCommand = (index: number) => {
    const updatedCommands = [...(value.commands || [])];
    updatedCommands.splice(index, 1);
    onChange({ commands: updatedCommands });
  };

  const handleAddResponsibility = (commandIndex: number) => {
    if (!newResponsibility.trim()) return;
    
    const updatedCommands = [...(value.commands || [])].map((cmd, idx) => {
      if (idx === commandIndex) {
        return {
          ...cmd,
          responsibilities: [...(cmd.responsibilities || []), newResponsibility.trim()]
        };
      }
      return cmd;
    });
    
    onChange({ commands: updatedCommands });
    setNewResponsibility('');
  };

  const handleRemoveResponsibility = (commandIndex: number, respIndex: number) => {
    const updatedCommands = [...(value.commands || [])].map((cmd, idx) => {
      if (idx === commandIndex) {
        return {
          ...cmd,
          responsibilities: (cmd.responsibilities || []).filter((_, i) => i !== respIndex)
        };
      }
      return cmd;
    });
    
    onChange({ commands: updatedCommands });
  };

  const handleCommandFieldChange = (commandIndex: number, field: keyof Command, fieldValue: string) => {
    const updatedCommands = [...(value.commands || [])].map((cmd, idx) => {
      if (idx === commandIndex) {
        return {
          ...cmd,
          [field]: fieldValue
        };
      }
      return cmd;
    });
    
    onChange({ commands: updatedCommands });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Military History</h2>

      {/* Branch and Rank Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Branch *</label>
          <select
            value={value.branch || ''}
            onChange={(e) => onChange({ branch: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Branch</option>
            {militaryBranches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title/MOS *</label>
          {customJob ? (
            <div className="mt-1 space-y-2">
              <input
                type="text"
                value={value.jobTitle || ''}
                onChange={(e) => onChange({ jobTitle: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter custom job title"
                required
              />
              <button
                type="button"
                onClick={() => setCustomJob(false)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to list
              </button>
            </div>
          ) : (
            <select
              value={value.jobTitle || ''}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setCustomJob(true);
                  onChange({ jobTitle: '' });
                } else {
                  onChange({ jobTitle: e.target.value });
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Job Title/MOS</option>
              {value.branch && militaryJobs[value.branch]?.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
              <option value="custom">Enter Custom Job Title</option>
            </select>
          )}
        </div>
      </div>

      {/* Command History */}
      <div className="space-y-4">
        <h3 className="text-md font-medium">Command History</h3>
        
        {(value.commands || []).map((command, commandIndex) => (
          <div key={commandIndex} className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Command/Unit *</label>
                <input
                  type="text"
                  value={command.unit || ''}
                  onChange={(e) => handleCommandFieldChange(commandIndex, 'unit', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                <input
                  type="month"
                  value={command.startDate || ''}
                  onChange={(e) => handleCommandFieldChange(commandIndex, 'startDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date *</label>
                <input
                  type="month"
                  value={command.endDate || ''}
                  onChange={(e) => handleCommandFieldChange(commandIndex, 'endDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Job Responsibilities */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Job Responsibilities</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  placeholder="Enter responsibility..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <Button
                  type="button"
                  onClick={() => handleAddResponsibility(commandIndex)}
                  disabled={!newResponsibility.trim()}
                >
                  Add
                </Button>
              </div>

              {(command.responsibilities || []).map((resp, respIndex) => (
                <div key={respIndex} className="flex items-center justify-between bg-white p-2 rounded-md">
                  <span className="text-sm text-gray-700">{resp}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveResponsibility(commandIndex, respIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleRemoveCommand(commandIndex)}
              className="text-red-600 hover:text-red-700"
            >
              Remove Command
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={handleAddCommand}
          className="w-full"
        >
          Add Command
        </Button>
      </div>
    </div>
  );
}