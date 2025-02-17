import { useState, useEffect } from 'react';
import { getMilitaryService } from '../api';
import type { Database } from '../types';

type MilitaryServiceRecord = Database['public']['Tables']['military_service']['Row'] & {
  evaluations: Array<Database['public']['Tables']['evaluations']['Row'] & {
    job_matches: Database['public']['Tables']['job_matches']['Row'][]
  }>
};

export function useMilitaryService(userId: string | undefined) {
  const [service, setService] = useState<MilitaryServiceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadService() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getMilitaryService(userId);
        setService(data?.[0] ?? null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load military service'));
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [userId]);

  return { service, loading, error };
}