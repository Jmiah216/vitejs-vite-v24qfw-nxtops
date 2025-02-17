import { useState } from 'react';
import { Button } from '../../ui/button';
import { Command } from '../../../types/military';

interface Props {
  commands: Command[];
  onChange: (commands: Command[]) => void;
}

export function CommandSection({ commands, onChange }: Props) {
  const [newCommand, setNewCommand] = useState<Command>({
    unit: '',
    position: '',
    startDate: '',
    endDate: '',
    responsibilities: []
  });

  const handleAddCommand = () => {
    onChange([...commands, newCommand]);
    setNewCommand({
      unit: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: []
    });
  };

  const handleRemoveCommand = (index: number) => {
    onChange(commands.filter((_, i) => i !== index));
  };

  const handleAddResponsibility = (commandIndex: number, responsibility: string) => {
    const updatedCommands = [...commands];
    updatedCommands[commandIndex].responsibilities.push(responsibility);
    onChange(updatedCommands);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Command History</h2>

      {commands.map((command, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <input
                type="text"
                value={command.unit}
                onChange={(e) => {
                  const updated = [...commands];
                  updated[index].unit = e.target.value;
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={command.position}
                onChange={(e) => {
                  const updated = [...commands];
                  updated[index].position = e.target.value;
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={command.startDate}
                onChange={(e) => {
                  const updated = [...commands];
                  updated[index].startDate = e.target.value;
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="month"
                value={command.endDate}
                onChange={(e) => {
                  const updated = [...commands];
                  updated[index].endDate = e.target.value;
                  onChange(updated);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleRemoveCommand(index)}
            className="text-red-600 hover:text-red-700"
          >
            Remove Command
          </Button>
        </div>
      ))}

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input
              type="text"
              value={newCommand.unit}
              onChange={(e) => setNewCommand({ ...newCommand, unit: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              value={newCommand.position}
              onChange={(e) => setNewCommand({ ...newCommand, position: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="month"
              value={newCommand.startDate}
              onChange={(e) => setNewCommand({ ...newCommand, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="month"
              value={newCommand.endDate}
              onChange={(e) => setNewCommand({ ...newCommand, endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={handleAddCommand}
          disabled={!newCommand.unit || !newCommand.position || !newCommand.startDate || !newCommand.endDate}
        >
          Add Command
        </Button>
      </div>
    </div>
  );
}