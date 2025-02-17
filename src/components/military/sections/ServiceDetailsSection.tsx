import { militaryBranches, militaryRanks } from '../../../lib/constants';
import { MilitaryInfo } from '../../../types/military';

interface Props {
  value: MilitaryInfo;
  onChange: (updates: Partial<MilitaryInfo>) => void;
}

export function ServiceDetailsSection({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Service Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Branch</label>
          <select
            value={value.branch}
            onChange={(e) => onChange({ branch: e.target.value })}
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
          <select
            value={value.rank}
            onChange={(e) => onChange({ rank: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Rank</option>
            {value.branch && militaryRanks[value.branch]?.map(rank => (
              <option key={rank.id} value={rank.rank}>
                {rank.rank} ({rank.grade})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Primary MOS/Rating</label>
          <input
            type="text"
            value={value.primaryMOS}
            onChange={(e) => onChange({ primaryMOS: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <input
            type="text"
            value={value.unit}
            onChange={(e) => onChange({ unit: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Service Start Date</label>
          <input
            type="month"
            value={value.serviceStartDate}
            onChange={(e) => onChange({ serviceStartDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Service End Date</label>
          <input
            type="month"
            value={value.serviceEndDate}
            onChange={(e) => onChange({ serviceEndDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
    </div>
  );
}