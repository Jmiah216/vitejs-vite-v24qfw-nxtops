import { militaryBranches } from '../../../lib/constants';
import type { ServiceDetails } from '../../../types';

interface Props {
  value: ServiceDetails;
  onChange: (details: ServiceDetails) => void;
}

export function ServiceDetailsForm({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Branch of Service</label>
        <select
          value={value.branch}
          onChange={(e) => onChange({ ...value, branch: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select Branch</option>
          {militaryBranches.map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rank</label>
        <input
          type="text"
          value={value.rank}
          onChange={(e) => onChange({ ...value, rank: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
    </div>
  );
}