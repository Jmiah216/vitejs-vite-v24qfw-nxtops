import React from 'react';

export function JobLoadingSpinner() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-center space-x-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
        <span className="text-gray-600">Finding matching civilian careers...</span>
      </div>
    </div>
  );
}