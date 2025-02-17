import React from 'react';
import { Button } from './ui/button';

interface Props {
  error: string;
  onRetry: () => void;
  onViewONET: () => void;
}

export function JobLoadingError({ error, onRetry, onViewONET }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <div className="space-x-4">
          <Button onClick={onRetry}>Try Again</Button>
          <Button variant="outline" onClick={onViewONET}>
            Search on O*NET
          </Button>
        </div>
      </div>
    </div>
  );
}