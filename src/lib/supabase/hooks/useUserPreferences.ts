import { useState, useEffect } from 'react';
import { supabase } from '../client';
import type { Database } from '../types';

type Preferences = Database['public']['Tables']['user_preferences']['Row'];

export function useUserPreferences(userId: string | undefined) {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadPreferences() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
        setPreferences(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load preferences'));
      } finally {
        setLoading(false);
      }
    }

    loadPreferences();
  }, [userId]);

  const updatePreferences = async (updates: Partial<Preferences>) => {
    if (!userId) return;

    try {
      const { error: updateError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: userId,
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      setPreferences(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update preferences');
    }
  };

  return { preferences, loading, error, updatePreferences };
}