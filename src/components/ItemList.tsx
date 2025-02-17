import React from 'react';
import { Button } from './ui/button';

interface Props {
  items: string[];
  onRemove: (index: number) => void;
  emptyMessage?: string;
}

export function ItemList({ items, onRemove, emptyMessage }: Props) {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic">
        {emptyMessage || "No items added yet"}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
          <span className="text-gray-700">{item}</span>
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
  );
}