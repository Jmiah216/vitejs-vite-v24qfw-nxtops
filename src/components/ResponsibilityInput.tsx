import React, { useState } from 'react';
import { Button } from './ui/button';

interface Props {
  onAdd: (responsibility: string) => void;
  placeholder?: string;
}

export function ResponsibilityInput({ onAdd, placeholder }: Props) {
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
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder || "Enter responsibility..."}
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
  );
}