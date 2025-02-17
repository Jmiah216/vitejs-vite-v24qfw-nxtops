import React from 'react';
import { Button } from '../../ui/button';

interface Props {
  onRemove: () => void;
}

export function RemoveCommandButton({ onRemove }: Props) {
  return (
    <div className="flex justify-end">
      <Button
        type="button"
        onClick={onRemove}
        variant="outline"
        className="text-red-600 hover:text-red-700"
      >
        Remove Command
      </Button>
    </div>
  );
}