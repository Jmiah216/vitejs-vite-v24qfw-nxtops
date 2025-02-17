import { Link } from 'react-router-dom';
import { formatDate, getRelativeTimeString } from '../../lib/utils/dateUtils';
import type { Resume } from '../../types';

interface Props {
  resume: Resume;
}

export function ResumeCard({ resume }: Props) {
  const createdDate = resume.created_at ? new Date(resume.created_at) : new Date();
  const relativeTime = getRelativeTimeString(createdDate);

  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {resume.variant?.charAt(0).toUpperCase() + resume.variant?.slice(1)} Resume
          </h3>
          <p className="text-sm text-gray-500">
            Created {relativeTime} ({formatDate(createdDate)})
          </p>
        </div>
      </div>

      {resume.selectedJobs && resume.selectedJobs.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Target Positions:</h4>
          <div className="space-y-1">
            {resume.selectedJobs.map((job, index) => (
              <p key={index} className="text-sm text-gray-600">{job.title}</p>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Link 
          to={`/resume/${resume.id}`}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          View Resume →
        </Link>
      </div>
    </div>
  );
}