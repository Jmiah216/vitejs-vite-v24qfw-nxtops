import { useState, useEffect } from 'react';
import { getUserRole } from '../lib/supabase/roles';

export function useUserRole(userId: string | undefined) {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRole() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const userRole = await getUserRole(userId);
        setRole(userRole);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load user role'));
      } finally {
        setLoading(false);
      }
    }

    loadRole();
  }, [userId]);

  return { role, loading, error, isSuperAdmin: role === 'super_admin' };
}