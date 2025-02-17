import { useState } from 'react';
import { Button } from '../ui/button';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  comments: string;
  agreement: boolean;
}

interface Props {
  onSubmit: (info: PersonalInfo) => void;
}

export function PersonalInfoForm({ onSubmit }: Props) {
  const [info, setInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    comments: '',
    agreement: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(info);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={info.fullName}
            onChange={(e) => setInfo(prev => ({ ...prev, fullName: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={info.email}
            onChange={(e) => setInfo(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={info.phone}
            onChange={(e) => setInfo(prev => ({ ...prev, phone: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Location</label>
          <input
            type="text"
            name="location"
            value={info.location}
            onChange={(e) => setInfo(prev => ({ ...prev, location: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Notes or Comments</label>
        <textarea
          name="comments"
          value={info.comments}
          onChange={(e) => setInfo(prev => ({ ...prev, comments: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          name="agreement"
          checked={info.agreement}
          onChange={(e) => setInfo(prev => ({ ...prev, agreement: e.target.checked }))}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          required
        />
        <label className="ml-2 block text-sm text-gray-700">
          I confirm that the information provided is accurate and agree to the use of this data for the purpose of career transition assistance.
        </label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!info.agreement}>
          Continue
        </Button>
      </div>
    </form>
  );
}