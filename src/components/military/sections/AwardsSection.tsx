import { useState } from 'react';
import { Button } from '../../ui/button';

interface Props {
  awards: string[];
  onChange: (awards: string[]) => void;
}

export function AwardsSection({ awards, onChange }: Props) {
  const [newAward, setNewAward] = useState('');

  const handleAddAward = () => {
    if (newAward.trim()) {
      onChange([...awards, newAward.trim()]);
      setNewAward('');
    }
  };

  const handleRemoveAward = (index: number) => {
    onChange(awards.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Awards and Decorations</h2>

      {awards.map((award, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
          <span className="text-gray-700">{award}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleRemoveAward(index)}
            className="text-red-600 hover:text-red-700"
          >
            Remove
          </Button>
        </div>
      ))}

      <div className="flex gap-2">
        <input
          type="text"
          value={newAward}
          onChange={(e) => setNewAward(e.target.value)}
          placeholder="Enter award or decoration..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <Button
          type="button"
          onClick={handleAddAward}
          disabled={!newAward.trim()}
        >
          Add Award
        </Button>
      </div>
    </div>
  );
}