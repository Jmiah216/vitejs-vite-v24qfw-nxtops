import { useState, useEffect } from 'react';
import { supabase } from '../client';
import type { Database } from '../types';

type Template = Database['public']['Tables']['resume_templates']['Row'];

export function useResumeTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const { data, error: fetchError } = await supabase
          .from('resume_templates')
          .select('*')
          .order('name');

        if (fetchError) throw fetchError;
        setTemplates(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load templates'));
      } finally {
        setLoading(false);
      }
    }

    loadTemplates();
  }, []);

  return { templates, loading, error };
}