import { useState } from 'react';
import { Button } from '../ui/button';
import type { MilitaryEvaluation } from '../../types';

interface Props {
  onSubmit: (evaluation: MilitaryEvaluation) => void;
  onBack: () => void;
}

export function ManualEntryForm({ onSubmit, onBack }: Props) {
  const [evaluation, setEvaluation] = useState<MilitaryEvaluation>({
    branch: '',
    rank: '',
    evaluationDate: '',
    responsibilities: [],
    achievements: [],
    technicalSkills: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(evaluation);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="mr-4"
        >
          ← Back
        </Button>
        <h2 className="text-2xl font-bold">Manually Enter Your Evaluation</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch of Service</label>
            <select
              value={evaluation.branch}
              onChange={(e) => setEvaluation(prev => ({ ...prev, branch: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Branch</option>
              <option value="Army">Army</option>
              <option value="Navy">Navy</option>
              <option value="Air Force">Air Force</option>
              <option value="Marines">Marines</option>
              <option value="Coast Guard">Coast Guard</option>
              <option value="Space Force">Space Force</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rank</label>
            <input
              type="text"
              value={evaluation.rank}
              onChange={(e) => setEvaluation(prev => ({ ...prev, rank: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Responsibilities</label>
          <textarea
            value={evaluation.responsibilities.join('\n')}
            onChange={(e) => setEvaluation(prev => ({ 
              ...prev, 
              responsibilities: e.target.value.split('\n').filter(r => r.trim())
            }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter each responsibility on a new line"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Achievements</label>
          <textarea
            value={evaluation.achievements.join('\n')}
            onChange={(e) => setEvaluation(prev => ({
              ...prev,
              achievements: e.target.value.split('\n').filter(a => a.trim())
            }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter each achievement on a new line"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
          <textarea
            value={evaluation.technicalSkills.join('\n')}
            onChange={(e) => setEvaluation(prev => ({
              ...prev,
              technicalSkills: e.target.value.split('\n').filter(s => s.trim())
            }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter each technical skill on a new line"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Generate Resume
          </Button>
        </div>
      </form>
    </div>
  );
}