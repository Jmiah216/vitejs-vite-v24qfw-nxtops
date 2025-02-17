import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthProvider';
import { ResumeList } from '../resume/ResumeList';
import { Button } from '../ui/button';
import { getUserResumes } from '../../lib/supabase/api';
import type { Resume } from '../../types';

export function ResumesPage() {
  const { user } = useAuthContext();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResumes() {
      if (!user?.id) return;
      
      try {
        const userResumes = await getUserResumes(user.id);
        setResumes(userResumes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load resumes');
      } finally {
        setLoading(false);
      }
    }

    loadResumes();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
        <Link to="/evaluation">
          <Button>Create New Resume</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading resumes...</div>
      ) : error ? (
        <div className="text-red-600 text-center py-8">{error}</div>
      ) : (
        <ResumeList resumes={resumes} />
      )}
    </div>
  );
}