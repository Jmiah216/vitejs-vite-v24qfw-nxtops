import React, { useState } from 'react';
import { Button } from '../ui/button';

interface Props {
  awards: string[];
  onChange: (awards: string[]) => void;
}

export function AwardsForm({ awards, onChange }: Props) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onChange([...awards, input.trim()]);
      setInput('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(awards.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Awards and Achievements</h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter award or achievement..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!input.trim()}
          >
            Add
          </Button>
        </div>

        {awards.length > 0 && (
          <ul className="space-y-2">
            {awards.map((award, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <span className="text-gray-700">{award}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}