import { ResumeCard } from './ResumeCard';
import type { Resume } from '../../types';

interface Props {
  resumes: Resume[];
}

export function ResumeList({ resumes }: Props) {
  if (resumes.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No resumes created yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume, index) => (
        <ResumeCard key={index} resume={resume} />
      ))}
    </div>
  );
}