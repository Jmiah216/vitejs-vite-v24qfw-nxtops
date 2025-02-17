import React, { useState } from 'react';
import { Button } from './ui/button';

interface Props {
  responsibilities: string[];
  onAdd: (responsibility: string) => void;
  onRemove: (index: number) => void;
}

export function CommandResponsibilities({ responsibilities, onAdd, onRemove }: Props) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter responsibility..."
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

      {responsibilities.length > 0 && (
        <ul className="space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
              <span className="text-gray-700">{responsibility}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemove(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}