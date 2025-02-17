import React from 'react';
import { Checkbox } from './ui/checkbox';
import { OnetJob } from '../lib/onet';

interface Props {
  job: OnetJob & { selected: boolean };
  index: number;
  onSelect: (index: number) => void;
  disabled: boolean;
}

export function JobCard({ job, index, onSelect, disabled }: Props) {
  return (
    <div 
      className={`border rounded-lg p-4 transition-colors ${
        job.selected 
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-200 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={job.selected}
          onCheckedChange={() => onSelect(index)}
          disabled={disabled}
          className="mt-1"
        />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
              <p className="text-sm text-gray-500">O*NET Code: {job.code}</p>
            </div>
            {job.salary && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Median Salary: {job.salary.median}</p>
                <p className="text-sm text-gray-500">Range: {job.salary.range}</p>
              </div>
            )}
          </div>
          
          <p className="text-gray-600">{job.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-1">Key Skills</h5>
              <div className="flex flex-wrap gap-1">
                {job.skills.map((skill, i) => (
                  <span 
                    key={`${skill}-${i}`}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-1">Common Tasks</h5>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {job.tasks.slice(0, 3).map((task, i) => (
                  <li key={`${task}-${i}`}>{task}</li>
                ))}
              </ul>
            </div>
          </div>

          {job.outlook && (
            <div>
              <h5 className="font-medium text-gray-900 mb-1">Job Outlook</h5>
              <p className="text-gray-600">{job.outlook}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}